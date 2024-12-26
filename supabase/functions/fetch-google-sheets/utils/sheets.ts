import { Campaign, DateRange } from '../types.ts';
import { isWithinInterval, parseISO } from 'https://esm.sh/date-fns@2.30.0';

const SHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
const TAB_NAME = 'Class Data';
const RANGE = 'A2:F31';

export async function fetchSheetData(apiKey: string) {
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

export function aggregateCampaignData(rows: any[], dateRange?: DateRange) {
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