import { supabase } from "@/integrations/supabase/client";

export const handleFacebookAdsConnect = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('No authenticated session found');
  }

  const { data, error } = await supabase.functions.invoke('facebook-ads-auth');
  
  if (error || !data?.data) {
    console.error('Error fetching Facebook ad accounts:', error || 'No accounts data received');
    throw new Error('Failed to fetch Facebook ad accounts');
  }

  console.log('Facebook accounts data:', data);
  return data.data;
};