import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientId = Deno.env.get('GOOGLE_ADS_CLIENT_ID');
    const apiKey = Deno.env.get('GOOGLE_ADS_API_KEY');
    
    if (!clientId || !apiKey) {
      throw new Error('Google Ads credentials not configured');
    }

    console.log('Retrieved Google Ads credentials successfully');

    return new Response(
      JSON.stringify({ 
        clientId,
        apiKey,
        status: 'success' 
      }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in get-google-ads-credentials function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
        status: 400 
      }
    );
  }
});