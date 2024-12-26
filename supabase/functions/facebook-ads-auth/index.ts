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
    console.log('Starting Facebook Ads auth process...')
    
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Verify user authentication
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      console.error('Auth error:', userError)
      throw new Error('Unauthorized')
    }

    console.log('User authenticated:', user.id)

    // Get Facebook credentials from environment
    const accessToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN')
    if (!accessToken) {
      throw new Error('Facebook access token not configured')
    }
    
    console.log('Fetching Facebook ad accounts...')

    // Fetch ad accounts from Facebook Marketing API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/adaccounts?fields=name,account_id,currency,timezone_name,account_status&access_token=${accessToken}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()
    console.log('Facebook API response:', JSON.stringify(data))

    if (!response.ok) {
      console.error('Facebook API error:', data.error)
      throw new Error(data.error?.message || 'Failed to fetch Facebook ad accounts')
    }

    // Transform the data to match our expected format
    const transformedData = data.data.map((account: any) => ({
      id: account.id,
      name: account.name,
      account_id: account.account_id,
      currency: account.currency,
      timezone_name: account.timezone_name,
      account_status: account.account_status.toString()
    }))

    return new Response(
      JSON.stringify({ data: transformedData }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})