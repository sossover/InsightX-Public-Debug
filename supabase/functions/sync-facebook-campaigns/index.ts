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
    const { accountId } = await req.json()
    console.log('Syncing campaigns for account:', accountId)
    
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get Facebook access token and account ID for the account
    const { data: accountData, error: accountError } = await supabaseClient
      .from('ad_accounts')
      .select('access_token, account_id')
      .eq('id', accountId)
      .single()

    if (accountError) {
      console.error('Failed to get account data:', accountError)
      throw new Error('Failed to get account data from database')
    }

    if (!accountData?.access_token) {
      console.error('No access token found for account')
      throw new Error('No Facebook access token found for this account')
    }

    console.log('Retrieved account data, fetching insights from Facebook')

    // Calculate date range (last 30 days)
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 30)

    // Format dates for Facebook API
    const since = startDate.toISOString().split('T')[0]
    const until = endDate.toISOString().split('T')[0]

    console.log('Fetching data for date range:', { since, until })

    // Fetch campaign data from Facebook Marketing API
    const fbResponse = await fetch(
      `https://graph.facebook.com/v19.0/act_${accountData.account_id}/campaigns?fields=name,insights.time_range({"since":"${since}","until":"${until}"}){spend,impressions,clicks,actions}&access_token=${accountData.access_token}`
    )

    if (!fbResponse.ok) {
      const errorData = await fbResponse.json()
      console.error('Facebook API error:', errorData)
      throw new Error(`Facebook API error: ${JSON.stringify(errorData)}`)
    }

    const fbData = await fbResponse.json()
    console.log('Raw Facebook campaign data:', JSON.stringify(fbData, null, 2))

    if (!fbData.data || fbData.data.length === 0) {
      console.log('No campaign data returned from Facebook')
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No campaign data found for the specified date range' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Process and insert campaign data
    const campaignData = fbData.data.map((campaign: any) => {
      const insights = campaign.insights?.data?.[0] || {}
      
      // Find purchase conversions in actions array
      const conversions = insights.actions?.reduce((total: number, action: any) => {
        if (action.action_type === 'purchase' || 
            action.action_type === 'offsite_conversion.fb_pixel_purchase') {
          return total + parseInt(action.value || '0')
        }
        return total
      }, 0) || 0

      return {
        account_id: accountId,
        name: campaign.name,
        spend: parseFloat(insights.spend || '0'),
        impressions: parseInt(insights.impressions || '0'),
        clicks: parseInt(insights.clicks || '0'),
        conversions: conversions,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    })

    console.log('Processed campaign data:', JSON.stringify(campaignData, null, 2))

    // Delete existing data for this account
    const { error: deleteError } = await supabaseClient
      .from('campaigns')
      .delete()
      .eq('account_id', accountId)

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
        error: error.message || 'An unexpected error occurred',
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})