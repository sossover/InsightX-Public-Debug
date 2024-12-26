import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Get Facebook access token from environment
    const accessToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN')
    if (!accessToken) {
      console.error('Facebook access token not configured in environment')
      throw new Error('Facebook access token not configured')
    }

    // Fetch ad accounts from Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/v19.0/me/adaccounts?fields=id,name,account_id,currency,timezone_name,account_status&access_token=${accessToken}`
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Facebook API error:', error);
      throw new Error('Failed to fetch Facebook ad accounts');
    }

    const data = await response.json();
    console.log('Facebook API response:', data);

    // Transform the data to match the expected format
    const accounts = data.data.map((account: any) => ({
      id: account.id,
      name: account.name,
      account_id: account.account_id,
      currency: account.currency,
      timezone_name: account.timezone_name,
      account_status: account.account_status,
    }));

    return new Response(
      JSON.stringify({
        data: accounts,
        success: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})