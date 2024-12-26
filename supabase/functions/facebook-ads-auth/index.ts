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
    // Parse the request body
    let body;
    try {
      body = await req.json()
    } catch (e) {
      console.error('Error parsing request body:', e)
      throw new Error('Invalid request body')
    }

    console.log('Received request with body:', body)

    if (!body || !body.action) {
      throw new Error('Missing required action parameter')
    }

    if (body.action === 'get-token') {
      const accessToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN')
      if (!accessToken) {
        throw new Error('Facebook access token not configured')
      }

      console.log('Retrieved Facebook access token successfully')

      return new Response(
        JSON.stringify({
          access_token: accessToken,
          success: true
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    throw new Error('Invalid action')
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