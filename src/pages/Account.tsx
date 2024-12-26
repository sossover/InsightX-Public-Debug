import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { initiateGoogleAdsAuth } from "@/utils/googleAdsAuth";
import { AdAccountsList } from "@/components/account/AdAccountsList";
import { PlatformCard } from "@/components/account/PlatformCard";
import { GoogleAdsAccountSelector } from "@/components/account/GoogleAdsAccountSelector";
import { FacebookAdsAccountSelector } from "@/components/account/FacebookAdsAccountSelector";

interface AdAccount {
  id: string;
  platform: string;
  account_id: string;
  account_name: string | null;
}

interface GoogleAdsAccount {
  id: string;
  name: string;
  customerId: string;
}

interface FacebookAdsAccount {
  id: string;
  name: string;
  account_id: string;
  currency: string;
  timezone_name: string;
  account_status: string;
}

export default function Account() {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isGoogleAccountSelectorOpen, setIsGoogleAccountSelectorOpen] = useState(false);
  const [isFacebookAccountSelectorOpen, setIsFacebookAccountSelectorOpen] = useState(false);
  const [googleAdsAccounts, setGoogleAdsAccounts] = useState<GoogleAdsAccount[]>([]);
  const [facebookAdsAccounts, setFacebookAdsAccounts] = useState<FacebookAdsAccount[]>([]);
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchAdAccounts();
    fetchUserEmail();

    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      const accountsData = params.get('accounts');
      if (accountsData) {
        try {
          const accounts = JSON.parse(decodeURIComponent(accountsData));
          console.log('Parsed accounts:', accounts);
          setGoogleAdsAccounts(accounts);
          setIsGoogleAccountSelectorOpen(true);
          window.history.replaceState({}, '', window.location.pathname);
        } catch (error) {
          console.error('Error parsing accounts data:', error);
          toast({
            title: "Error",
            description: "Failed to load Google Ads accounts",
            variant: "destructive",
          });
        }
      }
    }
  }, [toast]);

  const fetchUserEmail = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserEmail(user.email);
    }
  };

  const fetchAdAccounts = async () => {
    const { data, error } = await supabase
      .from('ad_accounts')
      .select('*');

    if (error) {
      toast({
        title: "Error fetching ad accounts",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setAdAccounts(data || []);
  };

  const handleConnect = async (platform: string) => {
    if (platform === 'Google Ads') {
      try {
        initiateGoogleAdsAuth();
      } catch (error) {
        toast({
          title: "Connection Error",
          description: "Failed to initiate Google Ads connection",
          variant: "destructive",
        });
      }
    } else if (platform === 'Facebook Ads') {
      try {
        setLoadingPlatform('Facebook Ads');
        
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('No authenticated session found');
        }

        const response = await supabase.functions.invoke('facebook-ads-auth', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.data) {
          throw new Error('Failed to fetch Facebook ad accounts');
        }

        setFacebookAdsAccounts(response.data.data);
        setIsFacebookAccountSelectorOpen(true);
      } catch (error) {
        console.error('Error connecting Facebook Ads:', error);
        toast({
          title: "Connection Error",
          description: "Failed to connect Facebook Ads accounts",
          variant: "destructive",
        });
      } finally {
        setLoadingPlatform(null);
      }
    } else {
      toast({
        title: "Coming Soon",
        description: `${platform} integration will be available soon!`,
      });
    }
  };

  const platforms = [
    { 
      name: 'Google Ads', 
      description: 'Connect your Google Ads account to analyze performance' 
    },
    { 
      name: 'Facebook Ads', 
      description: 'Connect your Facebook Ads account to analyze performance' 
    },
    { 
      name: 'TikTok Ads', 
      description: 'Connect your TikTok Ads account to analyze performance' 
    }
  ];

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        <NavigationSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-google-blue mb-2">Ad Accounts</h1>
                  {userEmail && (
                    <p className="text-gray-600 mb-2">Connected as: {userEmail}</p>
                  )}
                  <p className="text-gray-500">Connect your advertising accounts to analyze their performance</p>
                </div>

                <div className="space-y-4 mb-8">
                  {platforms.map((platform) => (
                    <PlatformCard
                      key={platform.name}
                      name={platform.name}
                      description={platform.description}
                      onConnect={() => handleConnect(platform.name)}
                      isLoading={loadingPlatform === platform.name}
                    />
                  ))}
                </div>

                <AdAccountsList 
                  adAccounts={adAccounts}
                  onAccountsChange={fetchAdAccounts}
                />

                <GoogleAdsAccountSelector
                  isOpen={isGoogleAccountSelectorOpen}
                  onClose={() => setIsGoogleAccountSelectorOpen(false)}
                  accounts={googleAdsAccounts}
                  onAccountsSelected={fetchAdAccounts}
                />

                <FacebookAdsAccountSelector
                  isOpen={isFacebookAccountSelectorOpen}
                  onClose={() => setIsFacebookAccountSelectorOpen(false)}
                  accounts={facebookAdsAccounts}
                  onAccountsSelected={fetchAdAccounts}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}