import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { accountId, dateFrom, dateTo } = await req.json()
    console.log('Syncing campaigns for account:', accountId, 'from:', dateFrom, 'to:', dateTo)
    
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get Facebook access token for the account
    const { data: accountData, error: accountError } = await supabaseClient
      .from('ad_accounts')
      .select('access_token, account_id')
      .eq('id', accountId)
      .single()

    if (accountError || !accountData?.access_token) {
      console.error('Failed to get account data:', accountError)
      throw new Error('Failed to get account access token')
    }

    console.log('Retrieved account data, fetching insights from Facebook')

    // Fetch data from Facebook Marketing API
    const fbResponse = await fetch(
      `https://graph.facebook.com/v18.0/${accountData.account_id}/insights?` +
      new URLSearchParams({
        fields: 'campaign_name,spend,impressions,clicks,conversions',
        time_range: JSON.stringify({
          since: dateFrom,
          until: dateTo
        }),
        level: 'campaign',
        access_token: accountData.access_token,
      })
    )

    if (!fbResponse.ok) {
      const errorData = await fbResponse.json()
      console.error('Facebook API error:', errorData)
      throw new Error(`Facebook API error: ${JSON.stringify(errorData)}`)
    }

    const fbData = await fbResponse.json()
    console.log('Received Facebook data:', JSON.stringify(fbData))

    if (!fbData.data) {
      console.log('No campaign data returned from Facebook')
      return new Response(
        JSON.stringify({ success: true, message: 'No campaign data found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Process and insert campaign data
    const campaignData = fbData.data.map((campaign: any) => ({
      account_id: accountId,
      name: campaign.campaign_name,
      spend: parseFloat(campaign.spend || '0'),
      impressions: parseInt(campaign.impressions || '0'),
      clicks: parseInt(campaign.clicks || '0'),
      conversions: parseInt(campaign.conversions || '0'),
      created_at: `${dateFrom}T00:00:00`,
      updated_at: new Date().toISOString()
    }))

    console.log('Processed campaign data:', JSON.stringify(campaignData))

    // Delete existing data for this date range and account
    const { error: deleteError } = await supabaseClient
      .from('campaigns')
      .delete()
      .eq('account_id', accountId)
      .gte('created_at', `${dateFrom}T00:00:00`)
      .lte('created_at', `${dateTo}T23:59:59`)

    if (deleteError) {
      console.error('Error deleting existing campaigns:', deleteError)
      throw deleteError
    }

    // Insert new data
    const { error: insertError } = await supabaseClient
      .from('campaigns')
      .insert(campaignData)

    if (insertError) {
      console.error('Error inserting campaign data:', insertError)
      throw insertError
    }

    console.log('Successfully synced campaign data')

    // Update last_sync_at timestamp for the account
    await supabaseClient
      .from('ad_accounts')
      .update({ last_sync_at: new Date().toISOString() })
      .eq('id', accountId)

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Campaign data synced successfully',
        campaigns: campaignData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Sync error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})