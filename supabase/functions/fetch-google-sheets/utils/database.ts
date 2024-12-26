import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { Campaign } from '../types.ts';

export async function updateCampaigns(
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