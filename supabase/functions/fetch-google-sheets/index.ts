import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { format, parse, isWithinInterval } from "https://esm.sh/date-fns@2.30.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Campaign {
  date: string;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

interface DateRange {
  from?: string;
  to?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting fetch-google-sheets function');
    
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

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    console.log('Supabase client created');

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

    // Transform and filter the data
    const campaigns: Campaign[] = [];
    let processedCount = 0;

    for (const row of data.values) {
      if (!row || row.length < 6) {
        console.log('Skipping invalid row:', row);
        continue;
      }

      const [dateStr, name, spendStr, impressionsStr, clicksStr, conversionsStr] = row;
      
      try {
        // Parse the date from the sheet (assuming DD/MM/YYYY format)
        const date = parse(dateStr, 'dd/MM/yyyy', new Date());
        console.log('Parsed date:', date, 'from string:', dateStr);
        
        // Check if date is within selected range
        if (dateRange?.from && dateRange?.to) {
          const fromDate = new Date(dateRange.from);
          const toDate = new Date(dateRange.to);
          
          console.log('Checking date range:', {
            date: date.toISOString(),
            fromDate: fromDate.toISOString(),
            toDate: toDate.toISOString()
          });

          if (!isWithinInterval(date, { start: fromDate, end: toDate })) {
            console.log(`Skipping row with date ${dateStr} - outside range ${dateRange.from} to ${dateRange.to}`);
            continue;
          }
        }

        const campaign = {
          date: format(date, 'yyyy-MM-dd'),
          name,
          spend: parseFloat(spendStr) || 0,
          impressions: parseInt(impressionsStr) || 0,
          clicks: parseInt(clicksStr) || 0,
          conversions: parseInt(conversionsStr) || 0,
        };

        campaigns.push(campaign);
        processedCount++;
        console.log('Processed campaign:', campaign);
        
      } catch (error) {
        console.error(`Error processing row: ${JSON.stringify(row)}`, error);
      }
    }

    console.log(`Transformed ${processedCount} campaigns:`, campaigns);

    // Insert campaign data
    if (campaigns.length > 0) {
      const { error: insertError } = await supabaseClient
        .from('campaigns')
        .insert(campaigns.map(campaign => ({
          account_id: accountId,
          name: campaign.name,
          spend: campaign.spend,
          impressions: campaign.impressions,
          clicks: campaign.clicks,
          conversions: campaign.conversions,
          created_at: campaign.date,
        })));

      if (insertError) {
        console.error('Error inserting campaigns:', insertError);
        throw insertError;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully synced ${campaigns.length} campaigns`,
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