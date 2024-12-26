import { supabase } from "@/integrations/supabase/client";

export const handleFacebookAdsConnect = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('No authenticated session found');
  }

  const response = await supabase.functions.invoke('facebook-ads-auth');
  
  if (!response.data) {
    throw new Error('Failed to fetch Facebook ad accounts');
  }

  return response.data.data || [];
};