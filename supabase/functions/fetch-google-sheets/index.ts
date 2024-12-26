import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { format, isWithinInterval, parseISO } from 'https://esm.sh/date-fns@2.30.0'

const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
const TAB_NAME = 'Class Data';
const RANGE = 'A2:F31';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Campaign {
  date: string;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting fetch-google-sheets function');
    
    // Parse request body
    let { accountId, dateRange } = await req.json();
    console.log('Received request with accountId:', accountId);
    console.log('Date range:', dateRange);

    if (!accountId) {
      throw new Error('Account ID is required');
    }

    // Fetch data from Google Sheets
    const apiKey = Deno.env.get('Google Sheets API v2');
    if (!apiKey) {
      console.error('Google Sheets API key not found');
      throw new Error('Google Sheets API key not configured');
    }

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

    // Transform and aggregate the data
    const campaignMap = new Map<string, Campaign>();
    
    data.values.forEach((row: any[]) => {
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

    // Convert aggregated data to array
    const aggregatedCampaigns = Array.from(campaignMap.values());
    console.log('Aggregated campaigns:', aggregatedCampaigns);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Update campaigns in database
    for (const campaign of aggregatedCampaigns) {
      const { data: existingCampaign, error: selectError } = await supabaseClient
        .from('campaigns')
        .select()
        .eq('account_id', accountId)
        .eq('name', campaign.name)
        .single();

      if (selectError && selectError.code !== 'PGRST116') {
        console.error('Error checking existing campaign:', selectError);
        continue;
      }

      if (existingCampaign) {
        // Update existing campaign
        const { error: updateError } = await supabaseClient
          .from('campaigns')
          .update({
            spend: campaign.spend,
            impressions: campaign.impressions,
            clicks: campaign.clicks,
            conversions: campaign.conversions,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingCampaign.id);

        if (updateError) {
          console.error('Error updating campaign:', updateError);
        }
      } else {
        // Insert new campaign
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
        }
      }
    }

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
})