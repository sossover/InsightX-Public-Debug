const GOOGLE_ADS_SCOPES = [
  'https://www.googleapis.com/auth/adwords',
  'https://www.googleapis.com/auth/userinfo.email'
].join(' ');

export const initiateGoogleAdsAuth = () => {
  // We'll use the Google Identity Services library
  const client_id = "YOUR_GOOGLE_CLIENT_ID"; // This should come from environment
  
  const redirectUri = `${window.location.origin}/google-ads-callback`;
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${client_id}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(GOOGLE_ADS_SCOPES)}&` +
    `response_type=code&` +
    `access_type=offline&` +
    `prompt=consent`;

  window.location.href = authUrl;
};