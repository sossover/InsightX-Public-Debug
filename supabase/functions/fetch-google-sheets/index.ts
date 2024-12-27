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
    console.log('Starting Google Sheets fetch process...');
    
    // Get account ID from headers
    const accountId = req.headers.get('x-account-id');
    if (!accountId) {
      console.error('No account ID provided in headers');
      throw new Error('No account ID provided');
    }
    console.log('Account ID:', accountId);

    // Get API key
    const apiKey = Deno.env.get('Google Sheets API v3');
    if (!apiKey) {
      console.error('Google Sheets API key not found');
      throw new Error('Google Sheets API key not configured');
    }
    console.log('API Key found, proceeding with fetch...');

    // Construct Google Sheets API URL
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TAB_NAME}!${RANGE}?key=${apiKey}`;
    console.log('Fetching from Google Sheets URL:', sheetsUrl);

    // Fetch data from Google Sheets
    const response = await fetch(sheetsUrl);
    if (!response.ok) {
      console.error('Google Sheets API Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
    }

    // Parse response
    const data = await response.json();
    console.log('Raw response from Google Sheets:', data);
    
    if (!data.values || data.values.length < 2) {
      console.error('No data found in sheet or insufficient rows');
      throw new Error('No data found in sheet');
    }

    // Log the headers and first row of data for debugging
    console.log('Headers:', data.values[0]);
    console.log('First row of data:', data.values[1]);

    // Transform the data
    const campaigns = data.values.slice(1).map((row: any[]) => ({
      name: row[0] || '',
      spend: parseFloat(row[1]) || 0,
      impressions: parseInt(row[2]) || 0,
      clicks: parseInt(row[3]) || 0,
      conversions: parseInt(row[4]) || 0,
      ctr: row[5] || '0%',
      cpa: parseFloat(row[6]) || 0
    }));

    console.log('Transformed campaigns:', campaigns);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Data fetched successfully from Google Sheets',
        data: campaigns,
        rowCount: campaigns.length 
      }),
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error in fetch-google-sheets function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.stack 
      }),
      { 
        status: 500, 
        headers: corsHeaders 
      }
    );
  }
});