import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FacebookInsightsResponse {
  data: Array<{
    campaign_name: string;
    spend: string;
    impressions: string;
    clicks: string;
    conversions: string;
  }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { accountId, date } = await req.json()
    
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

    if (accountError || !accountData) {
      throw new Error('Failed to get account data')
    }

    // Format date for Facebook API
    const formattedDate = date.split('T')[0]

    // Fetch data from Facebook Marketing API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${accountData.account_id}/insights?` +
      new URLSearchParams({
        fields: 'campaign_name,spend,impressions,clicks,actions',
        time_range: JSON.stringify({
          since: formattedDate,
          until: formattedDate
        }),
        access_token: accountData.access_token,
      })
    )

    const fbData: FacebookInsightsResponse = await response.json()

    // Process and insert campaign data
    const campaignData = fbData.data.map(campaign => ({
      account_id: accountId,
      name: campaign.campaign_name,
      spend: parseFloat(campaign.spend),
      impressions: parseInt(campaign.impressions),
      clicks: parseInt(campaign.clicks),
      conversions: parseInt(campaign.conversions),
      created_at: `${formattedDate}T00:00:00`,
      updated_at: new Date().toISOString()
    }))

    // Delete existing data for this date and account
    await supabaseClient
      .from('campaigns')
      .delete()
      .eq('account_id', accountId)
      .gte('created_at', `${formattedDate}T00:00:00`)
      .lte('created_at', `${formattedDate}T23:59:59`)

    // Insert new data
    const { error: insertError } = await supabaseClient
      .from('campaigns')
      .insert(campaignData)

    if (insertError) {
      throw insertError
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})