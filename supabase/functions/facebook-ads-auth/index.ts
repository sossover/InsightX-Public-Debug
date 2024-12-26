import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      req.headers.get('Authorization')!
    )

    if (userError || !user) {
      throw new Error('Unauthorized')
    }

    const accessToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN')
    const appId = Deno.env.get('FACEBOOK_APP_ID')
    
    // Fetch ad accounts from Facebook Marketing API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/adaccounts?fields=name,account_id,currency,timezone_name,account_status&access_token=${accessToken}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch Facebook ad accounts')
    }

    return new Response(
      JSON.stringify(data),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})