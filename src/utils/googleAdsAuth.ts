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
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${data.clientId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(GOOGLE_ADS_SCOPES)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;

    window.location.href = authUrl;
  } catch (error) {
    console.error('Error initiating Google Ads auth:', error);
    throw error;
  }
};