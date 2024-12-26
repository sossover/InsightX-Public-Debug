import { supabase } from "@/integrations/supabase/client";

export const handleFacebookAdsConnect = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('No authenticated session found');
  }

  try {
    const { data, error } = await supabase.functions.invoke('facebook-ads-auth');
    
    if (error || !data?.data) {
      console.error('Error fetching Facebook ad accounts:', error || 'No accounts data received');
      throw new Error('Failed to fetch Facebook ad accounts');
    }

    // Log the response to help with debugging
    console.log('Facebook accounts data:', data);
    
    // Ensure each account has an access token
    if (data.data.some((account: any) => !account.access_token)) {
      console.error('Some accounts are missing access tokens');
      throw new Error('Failed to get access tokens for some accounts');
    }

    return data.data;
  } catch (error) {
    console.error('Facebook Ads connection error:', error);
    throw error;
  }
};