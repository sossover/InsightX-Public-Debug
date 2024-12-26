import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SHEET_ID = '1t4JRDvgLfjj5kfdm_XFKXOec-BrUR2R2iGz16-E-uow';
const TAB_NAME = 'Sheet1';
const RANGE = 'A:G'; // Columns A through G

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-account-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching data from Google Sheets...');
    
    // Fetch data from Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB_NAME}!${RANGE}?key=${Deno.env.get('GOOGLE_SHEETS_API_KEY')}`
    );

    if (!response.ok) {
      console.error('Google Sheets API Error:', response.statusText);
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received data from Google Sheets:', data.values?.length, 'rows');
    
    if (!data.values || data.values.length < 2) {
      throw new Error('No data found in sheet');
    }

    // Skip header row and transform data
    const campaigns = data.values.slice(1).map((row: any[]) => ({
      name: row[0] || '',
      spend: parseFloat(row[1]) || 0,
      impressions: parseInt(row[2]) || 0,
      clicks: parseInt(row[3]) || 0,
      conversions: parseInt(row[4]) || 0,
      ctr: row[5] || '0%',
      cpa: parseFloat(row[6]) || 0
    }));

    console.log('Transformed campaigns:', campaigns.length);

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const accountId = req.headers.get('x-account-id');
    if (!accountId) {
      throw new Error('No account ID provided');
    }

    console.log('Using account ID:', accountId);

    // Clear existing campaign data for this account
    const { error: deleteError } = await supabaseClient
      .from('campaigns')
      .delete()
      .eq('account_id', accountId);

    if (deleteError) {
      console.error('Delete Error:', deleteError);
      throw new Error(`Failed to clear existing data: ${deleteError.message}`);
    }

    console.log('Cleared existing campaigns for account');

    // Insert new campaign data
    const { error: insertError } = await supabaseClient
      .from('campaigns')
      .insert(campaigns.map(campaign => ({
        ...campaign,
        account_id: accountId,
      })));

    if (insertError) {
      console.error('Insert Error:', insertError);
      throw new Error(`Failed to insert new data: ${insertError.message}`);
    }

    console.log('Successfully inserted new campaign data');

    return new Response(
      JSON.stringify({ success: true, message: 'Data synced successfully' }),
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error in fetch-google-sheets function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});