import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SHEET_ID = '1t4JRDvgLfjj5kfdm_XFKXOec-BrUR2R2iGz16-E-uow';
const TAB_NAME = 'Sheet1';
const RANGE = 'A:G'; // Columns A through G

serve(async (req) => {
  try {
    // Fetch data from Google Sheets
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB_NAME}!${RANGE}?key=${Deno.env.get('GOOGLE_SHEETS_API_KEY')}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }

    const data = await response.json();
    
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

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Clear existing campaign data
    const { error: deleteError } = await supabaseClient
      .from('campaigns')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (deleteError) {
      throw new Error(`Failed to clear existing data: ${deleteError.message}`);
    }

    // Insert new campaign data
    const { error: insertError } = await supabaseClient
      .from('campaigns')
      .insert(campaigns.map(campaign => ({
        ...campaign,
        account_id: req.headers.get('x-account-id'), // Get account_id from request header
      })));

    if (insertError) {
      throw new Error(`Failed to insert new data: ${insertError.message}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Data synced successfully' }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});