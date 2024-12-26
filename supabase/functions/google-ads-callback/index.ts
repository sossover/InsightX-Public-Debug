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
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    
    console.log('Received authorization code:', code)

    if (!code) {
      throw new Error('No authorization code provided')
    }

    const redirectUri = 'https://preview--insightx.lovable.app/google-ads-callback'
    
    // Exchange the code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: Deno.env.get('GOOGLE_ADS_CLIENT_ID') || '',
        client_secret: Deno.env.get('GOOGLE_ADS_CLIENT_SECRET') || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
        code
      })
    })

    console.log('Token exchange response status:', tokenResponse.status)

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error('Token exchange error:', errorText)
      throw new Error(`Failed to exchange code for tokens: ${tokenResponse.statusText}`)
    }

    const tokenData = await tokenResponse.json()
    console.log('Successfully obtained token data')

    // Return success response with CORS headers
    return new Response(
      JSON.stringify({ success: true, data: tokenData }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error('Error in google-ads-callback:', error.message)
    
    return new Response(
      JSON.stringify({ 
        error: true, 
        message: error.message 
      }),
      { 
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})