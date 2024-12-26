import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { isWithinInterval, parseISO } from 'https://esm.sh/date-fns@2.30.0';

// Define types inline to avoid import issues
interface Campaign {
  date: string;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}

async function fetchSheetData(apiKey: string) {
  const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
  const TAB_NAME = 'Class Data';
  const RANGE = 'A2:F31';

  const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB_NAME}!${RANGE}?key=${apiKey}`;
  console.log('Fetching from Google Sheets URL:', sheetsUrl);

  const response = await fetch(sheetsUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Raw data from sheets:', data);

  if (!data.values || !Array.isArray(data.values)) {
    throw new Error('Invalid data format from Google Sheets');
  }

  return data.values;
}

function aggregateCampaignData(rows: any[], dateRange?: { from: string; to: string }) {
  const campaignMap = new Map<string, Campaign>();

  rows.forEach((row: any[]) => {
    if (!row || row.length < 6) {
      console.log('Skipping invalid row:', row);
      return;
    }

    const [dateStr, name, spendStr, impressionsStr, clicksStr, conversionsStr] = row;
    
    try {
      const date = parseISO(dateStr);
      
      // Check if date is within selected range
      if (dateRange?.from && dateRange?.to) {
        const fromDate = parseISO(dateRange.from);
        const toDate = parseISO(dateRange.to);
        
        if (!isWithinInterval(date, { start: fromDate, end: toDate })) {
          console.log(`Skipping row with date ${dateStr} - outside range`);
          return;
        }
      }

      const spend = parseFloat(spendStr) || 0;
      const impressions = parseInt(impressionsStr) || 0;
      const clicks = parseInt(clicksStr) || 0;
      const conversions = parseInt(conversionsStr) || 0;

      if (campaignMap.has(name)) {
        // Aggregate metrics for existing campaign
        const existing = campaignMap.get(name)!;
        campaignMap.set(name, {
          ...existing,
          spend: existing.spend + spend,
          impressions: existing.impressions + impressions,
          clicks: existing.clicks + clicks,
          conversions: existing.conversions + conversions,
        });
        console.log(`Updated aggregated data for campaign: ${name}`);
      } else {
        // Create new campaign entry
        campaignMap.set(name, {
          date: dateStr,
          name,
          spend,
          impressions,
          clicks,
          conversions,
        });
        console.log(`Added new campaign: ${name}`);
      }
    } catch (error) {
      console.error(`Error processing row: ${JSON.stringify(row)}`, error);
    }
  });

  return Array.from(campaignMap.values());
}

async function updateCampaigns(
  supabaseClient: any,
  accountId: string,
  campaigns: Campaign[]
) {
  console.log(`Updating ${campaigns.length} campaigns for account ${accountId}`);

  // Clear existing campaigns for this account
  const { error: deleteError } = await supabaseClient
    .from('campaigns')
    .delete()
    .eq('account_id', accountId);

  if (deleteError) {
    console.error('Error clearing existing campaigns:', deleteError);
    throw deleteError;
  }
  console.log('Cleared existing campaigns for account');

  // Insert new campaign data
  for (const campaign of campaigns) {
    const { error: insertError } = await supabaseClient
      .from('campaigns')
      .insert({
        account_id: accountId,
        name: campaign.name,
        spend: campaign.spend,
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        conversions: campaign.conversions,
      });

    if (insertError) {
      console.error('Error inserting campaign:', insertError);
      throw insertError;
    }
  }
}

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