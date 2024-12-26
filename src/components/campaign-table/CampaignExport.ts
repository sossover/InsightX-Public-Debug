import { Campaign } from "./types";

export function exportToCSV(campaigns: Campaign[], totals: Campaign) {
  const headers = ['Campaign', 'Spend', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'CPA'];
  const data = campaigns.map(campaign => [
    campaign.name,
    campaign.spend.toFixed(2),
    campaign.impressions,
    campaign.clicks,
    campaign.ctr,
    campaign.conversions,
    campaign.cpa.toFixed(2)
  ]);
  
  data.push([
    totals.name,
    totals.spend.toFixed(2),
    totals.impressions,
    totals.clicks,
    totals.ctr,
    totals.conversions,
    totals.cpa.toFixed(2)
  ]);

  const csvContent = [headers, ...data]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'campaign_data.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}