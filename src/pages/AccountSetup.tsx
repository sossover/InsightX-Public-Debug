import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdAccount {
  id: string;
  name: string;
  currencyCode: string;
  timeZone: string;
}

export default function AccountSetup() {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchAdAccounts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
    }
  };

  const fetchAdAccounts = async () => {
    try {
      // In a real implementation, this would fetch accounts from Google Ads API
      // For now, we'll use mock data
      const mockAccounts: AdAccount[] = [
        { id: '1234567890', name: 'Main Marketing Account', currencyCode: 'USD', timeZone: 'America/New_York' },
        { id: '2345678901', name: 'Secondary Campaign Account', currencyCode: 'EUR', timeZone: 'Europe/London' },
        { id: '3456789012', name: 'Test Account', currencyCode: 'USD', timeZone: 'America/Los_Angeles' },
      ];
      setAccounts(mockAccounts);
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
      // Save selected accounts to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const promises = Array.from(selectedAccounts).map(accountId => {
        const account = accounts.find(a => a.id === accountId);
        return supabase.from('ad_accounts').upsert({
          user_id: user.id,
          platform: 'Google Ads',
          account_id: accountId,
          account_name: account?.name,
          is_active: true,
          account_currency: account?.currencyCode,
          account_timezone: account?.timeZone,
          account_status: 'ACTIVE',
        });
      });

      await Promise.all(promises);

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Google Ads Accounts</h1>
          <p className="text-gray-600">Choose the accounts you want to analyze in InsightX</p>
        </div>

        <div className="grid gap-4">
          {accounts.map((account) => (
            <Card 
              key={account.id}
              className={`transition-all duration-200 ${
                selectedAccounts.has(account.id) 
                  ? 'border-custom-purple-300 shadow-md' 
                  : 'hover:border-gray-300'
              }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{account.name}</CardTitle>
                <Button
                  variant={selectedAccounts.has(account.id) ? "default" : "outline"}
                  onClick={() => toggleAccountSelection(account.id)}
                  className="gap-2"
                >
                  {selectedAccounts.has(account.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Selected
                    </>
                  ) : (
                    "Select Account"
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Account ID:</span> {account.id}
                  </div>
                  <div>
                    <span className="font-medium">Currency:</span> {account.currencyCode}
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Time Zone:</span> {account.timeZone}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
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