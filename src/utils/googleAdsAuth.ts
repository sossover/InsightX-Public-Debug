import { supabase } from "@/integrations/supabase/client";

const GOOGLE_ADS_SCOPES = [
  'https://www.googleapis.com/auth/adwords',
  'https://www.googleapis.com/auth/userinfo.email'
].join(' ');

export const initiateGoogleAdsAuth = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('get-google-ads-credentials', {
      method: 'GET'
    });

    if (error) throw error;

    // Use the current origin for the redirect URI
    const redirectUri = `${window.location.origin}/google-ads-callback`;
    
    // Log the redirect URI to help with debugging
    console.log('Redirect URI:', redirectUri);
    
    // Create URLSearchParams but encode the redirect_uri separately
    const params = new URLSearchParams();
    params.append('client_id', data.clientId);
    params.append('redirect_uri', redirectUri); // This will be automatically encoded
    params.append('scope', GOOGLE_ADS_SCOPES);
    params.append('response_type', 'code');
    params.append('access_type', 'offline');
    params.append('prompt', 'consent');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    
    console.log('Full auth URL:', authUrl);
    
    window.location.href = authUrl;
  } catch (error) {
    console.error('Error initiating Google Ads auth:', error);
    throw error;
  }
};