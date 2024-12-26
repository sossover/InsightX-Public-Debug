import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { corsHeaders, handleCors } from "./utils/cors.ts";
import { fetchSheetData, aggregateCampaignData } from "./utils/sheets.ts";
import { updateCampaigns } from "./utils/database.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    console.log('Starting fetch-google-sheets function');
    
    // Parse request body
    const { accountId, dateRange } = await req.json();
    console.log('Received request with accountId:', accountId);
    console.log('Date range:', dateRange);

    if (!accountId) {
      throw new Error('Account ID is required');
    }

    // Get API key from environment
    const apiKey = Deno.env.get('Google Sheets API v2');
    if (!apiKey) {
      console.error('Google Sheets API key not found');
      throw new Error('Google Sheets API key not configured');
    }

    // Fetch data from Google Sheets
    const rows = await fetchSheetData(apiKey);
    console.log('Received data from Google Sheets:', rows.length, 'rows');

    // Transform and aggregate the data
    const aggregatedCampaigns = aggregateCampaignData(rows, dateRange);
    console.log('Transformed campaigns:', aggregatedCampaigns.length);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    console.log('Supabase client created');

    // Update campaigns in database
    await updateCampaigns(supabaseClient, accountId, aggregatedCampaigns);

    return new Response(
      JSON.stringify({
        success: true,
        rowCount: aggregatedCampaigns.length,
        message: `Successfully synced ${aggregatedCampaigns.length} campaigns`,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );

  } catch (error) {
    console.error('Error in fetch-google-sheets function:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});