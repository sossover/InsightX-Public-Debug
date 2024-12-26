import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MockAccountsList } from "@/components/account-setup/MockAccountsList";
import { GoogleAdsAccountsList } from "@/components/account-setup/GoogleAdsAccountsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Account {
  id: string;
  name: string;
  currencyCode: string;
  timeZone: string;
}

const mockAccounts: Account[] = [
  { 
    id: 'mock-1', 
    name: 'Sample Marketing Account', 
    currencyCode: 'USD', 
    timeZone: 'America/New_York' 
  },
  { 
    id: 'mock-2', 
    name: 'Sample E-commerce Account', 
    currencyCode: 'EUR', 
    timeZone: 'Europe/London' 
  },
  { 
    id: 'mock-3', 
    name: 'Sample B2B Account', 
    currencyCode: 'USD', 
    timeZone: 'America/Los_Angeles' 
  },
];

export default function AccountSetup() {
  const [loading, setLoading] = useState(true);
  const [googleAccounts, setGoogleAccounts] = useState<Account[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<string>("mock");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchGoogleAdsAccounts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const fetchGoogleAdsAccounts = async () => {
    try {
      const { data: adAccounts } = await supabase
        .from('ad_accounts')
        .select('*')
        .eq('platform', 'Google Ads')
        .eq('is_active', true);

      if (adAccounts) {
        const formattedAccounts: Account[] = adAccounts.map(account => ({
          id: account.account_id,
          name: account.account_name || 'Unnamed Account',
          currencyCode: account.account_currency || 'USD',
          timeZone: account.account_timezone || 'UTC',
        }));
        setGoogleAccounts(formattedAccounts);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch Google Ads accounts",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const toggleAccountSelection = (accountId: string) => {
    const newSelected = new Set(selectedAccounts);
    if (newSelected.has(accountId)) {
      newSelected.delete(accountId);
    } else {
      newSelected.add(accountId);
    }
    setSelectedAccounts(newSelected);
  };

  const handleContinue = async () => {
    if (selectedAccounts.size === 0) {
      toast({
        title: "Selection Required",
        description: "Please select at least one account to continue",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const promises = Array.from(selectedAccounts).map(accountId => {
        const isMock = accountId.startsWith('mock-');
        const account = isMock 
          ? mockAccounts.find(a => a.id === accountId)
          : googleAccounts.find(a => a.id === accountId);

        if (!account) return null;

        return supabase.from('ad_accounts').upsert({
          user_id: user.id,
          platform: 'Google Ads',
          account_id: accountId,
          account_name: account.name,
          is_active: true,
          account_currency: account.currencyCode,
          account_timezone: account.timeZone,
          account_status: 'ACTIVE',
        });
      });

      await Promise.all(promises.filter(Boolean));

      // If using mock data, insert sample campaign data
      for (const accountId of selectedAccounts) {
        if (accountId.startsWith('mock-')) {
          const { data: adAccount } = await supabase
            .from('ad_accounts')
            .select('id')
            .eq('account_id', accountId)
            .single();

          if (adAccount) {
            // Insert mock campaign data
            await supabase.from('campaigns').insert([
              {
                account_id: adAccount.id,
                name: 'Sample Search Campaign',
                spend: 1500.50,
                impressions: 50000,
                clicks: 2500,
                conversions: 125
              },
              {
                account_id: adAccount.id,
                name: 'Sample Display Campaign',
                spend: 750.25,
                impressions: 100000,
                clicks: 1500,
                conversions: 45
              }
            ]);
          }
        }
      }

      toast({
        title: "Success",
        description: "Your accounts have been connected successfully",
      });

      navigate('/');
    } catch (error) {
      console.error('Error saving account selections:', error);
      toast({
        title: "Error",
        description: "Failed to save account selections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-custom-purple-50 to-white">
        <Loader2 className="w-8 h-8 animate-spin text-custom-purple-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-purple-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Accounts</h1>
          <p className="text-gray-600">Choose the accounts you want to analyze in InsightX</p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mock">Mock Accounts</TabsTrigger>
            <TabsTrigger value="google">Google Ads Accounts</TabsTrigger>
          </TabsList>
          <TabsContent value="mock">
            <MockAccountsList
              accounts={mockAccounts}
              selectedAccounts={selectedAccounts}
              onToggleAccount={toggleAccountSelection}
            />
          </TabsContent>
          <TabsContent value="google">
            {googleAccounts.length > 0 ? (
              <GoogleAdsAccountsList
                accounts={googleAccounts}
                selectedAccounts={selectedAccounts}
                onToggleAccount={toggleAccountSelection}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No Google Ads accounts found.</p>
                <Button onClick={() => window.location.href = '/google-ads-auth'}>
                  Connect Google Ads
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={selectedAccounts.size === 0 || loading}
            className="gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}