export const initiateGoogleAdsAuth = async () => {
  try {
    const response = await fetch('https://tetpfwhzydrcoseyvhaw.functions.supabase.co/get-google-ads-credentials', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get Google Ads credentials');
    }

    const { clientId } = await response.json();
    
    if (!clientId) {
      throw new Error('Google Ads client ID not found');
    }

    const redirectUri = `${window.location.origin}/google-ads-callback`;
    console.log('Redirect URI:', redirectUri);

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', 'https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/userinfo.email');
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');

    console.log('Full auth URL:', authUrl.toString());
    
    window.location.href = authUrl.toString();
  } catch (error) {
    console.error('Error initiating Google Ads auth:', error);
    throw error;
  }
};