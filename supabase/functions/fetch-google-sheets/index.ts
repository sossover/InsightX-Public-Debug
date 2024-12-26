import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
const TAB_NAME = 'Class Data';
const RANGE = 'A2:F31';

interface Campaign {
  date: string;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

serve(async (req) => {
  try {
    const { accountId, dateRange } = await req.json();
    if (!accountId) {
      throw new Error('Account ID is required');
    }

    console.log('Account ID:', accountId);
    console.log('Date Range:', dateRange);

    // Fetch data from Google Sheets using the new API key
    const apiKey = Deno.env.get('Google Sheets API v2');
    if (!apiKey) {
      console.error('Google Sheets API key not found');
      throw new Error('Google Sheets API key not configured');
    }

    console.log('API Key found, proceeding with fetch...');
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB_NAME}!${RANGE}?key=${apiKey}`;
    console.log('Fetching from Google Sheets URL:', sheetsUrl);

    const response = await fetch(sheetsUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Raw data from sheets:', data);

    // Transform and aggregate the data
    const campaigns = new Map<string, Campaign>();
    
    data.values.forEach((row: any[]) => {
      const [dateStr, name, spendStr, impressionsStr, clicksStr, conversionsStr] = row;
      const date = new Date(dateStr);

      // Check if date is within selected range
      if (dateRange?.from && dateRange?.to) {
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        if (date < fromDate || date > toDate) {
          return; // Skip this row if outside date range
        }
      }

      const spend = parseFloat(spendStr) || 0;
      const impressions = parseInt(impressionsStr) || 0;
      const clicks = parseInt(clicksStr) || 0;
      const conversions = parseInt(conversionsStr) || 0;

      if (campaigns.has(name)) {
        // Aggregate metrics for existing campaign
        const existing = campaigns.get(name)!;
        campaigns.set(name, {
          ...existing,
          spend: existing.spend + spend,
          impressions: existing.impressions + impressions,
          clicks: existing.clicks + clicks,
          conversions: existing.conversions + conversions,
        });
      } else {
        // Create new campaign entry
        campaigns.set(name, {
          date: dateStr,
          name,
          spend,
          impressions,
          clicks,
          conversions,
        });
      }
    });

    // Convert aggregated data to array
    const aggregatedCampaigns = Array.from(campaigns.values());
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
        headers: { 'Content-Type': 'application/json' },
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
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
})