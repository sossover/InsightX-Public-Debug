import { supabase } from "@/integrations/supabase/client";

export const initiateGoogleAdsAuth = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('get-google-ads-credentials', {
      method: 'GET'
    });

    if (error) {
      console.error('Error getting Google Ads credentials:', error);
      throw error;
    }

    if (!data?.clientId || !data?.apiKey) {
      throw new Error('Google Ads credentials not found');
    }

    const redirectUri = `${window.location.origin}/google-ads-callback`;
    console.log('Redirect URI:', redirectUri);

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', data.clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/userinfo.email');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');
    authUrl.searchParams.append('key', data.apiKey);

    console.log('Full auth URL:', authUrl.toString());
    
    window.location.href = authUrl.toString();
  } catch (error) {
    console.error('Error initiating Google Ads auth:', error);
    throw error;
  }
};