import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_ADS_API_VERSION = 'v14';
const CLIENT_ID = Deno.env.get('GOOGLE_ADS_CLIENT_ID');
const CLIENT_SECRET = Deno.env.get('GOOGLE_ADS_CLIENT_SECRET');
const DEVELOPER_TOKEN = Deno.env.get('GOOGLE_ADS_DEVELOPER_TOKEN');

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    console.log('Received authorization code:', code);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      console.error('User authentication error:', userError);
      throw new Error('Invalid user');
    }

    console.log('Authenticated user:', user.id);

    // Exchange the authorization code for tokens
    const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        redirect_uri: `${req.headers.get('origin')}/google-ads-callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log('Token exchange response status:', tokenResponse.status);

    if (!tokenResponse.ok) {
      console.error('Token exchange error:', tokenData);
      throw new Error('Failed to exchange authorization code');
    }

    // Get user info from Google
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userInfo = await userInfoResponse.json();
    console.log('Got user info:', userInfo.email);

    // Fetch Google Ads accounts
    const googleAdsResponse = await fetch(
      `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'developer-token': DEVELOPER_TOKEN!,
        },
      }
    );

    if (!googleAdsResponse.ok) {
      console.error('Google Ads API error:', await googleAdsResponse.text());
      throw new Error('Failed to fetch Google Ads accounts');
    }

    const { resourceNames } = await googleAdsResponse.json();
    console.log('Found Google Ads accounts:', resourceNames);

    // For each account, get the details
    const accountPromises = resourceNames.map(async (resourceName: string) => {
      const accountId = resourceName.split('/')[1];
      
      // Get account details
      const accountResponse = await fetch(
        `https://googleads.googleapis.com/${GOOGLE_ADS_API_VERSION}/customers/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'developer-token': DEVELOPER_TOKEN!,
          },
        }
      );

      if (!accountResponse.ok) {
        console.error(`Failed to fetch details for account ${accountId}:`, await accountResponse.text());
        return null;
      }

      const accountData = await accountResponse.json();
      console.log('Account details:', accountData);

      return {
        id: accountId,
        name: accountData.customer.descriptiveName || accountId,
        customerId: accountId,
      };
    });

    const accounts = (await Promise.all(accountPromises)).filter(Boolean);

    // Instead of automatically inserting accounts, return them to the client
    return new Response(
      JSON.stringify({ 
        success: true, 
        accounts: accounts
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in google-ads-auth function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});