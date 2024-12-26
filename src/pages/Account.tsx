import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { initiateGoogleAdsAuth } from "@/utils/googleAdsAuth";

interface AdAccount {
  id: string;
  platform: string;
  account_id: string;
  account_name: string | null;
}

export default function Account() {
  const [adAccounts, setAdAccounts] = useState<AdAccount[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchAdAccounts();
    fetchUserEmail();
  }, []);

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
    } else {
      toast({
        title: "Coming Soon",
        description: `${platform} integration will be available soon!`,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // First, delete all campaigns associated with this account
      const { error: campaignsError } = await supabase
        .from('campaigns')
        .delete()
        .eq('account_id', id);

      if (campaignsError) {
        toast({
          title: "Error deleting campaigns",
          description: campaignsError.message,
          variant: "destructive",
        });
        return;
      }

      // Then delete the ad account
      const { error: accountError } = await supabase
        .from('ad_accounts')
        .delete()
        .eq('id', id);

      if (accountError) {
        toast({
          title: "Error deleting ad account",
          description: accountError.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Ad account and associated campaigns removed successfully",
      });
      
      fetchAdAccounts();
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Check URL parameters for success message
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      toast({
        title: "Success",
        description: "Google Ads account connected successfully!",
      });
      // Remove the success parameter from the URL
      window.history.replaceState({}, '', window.location.pathname);
      // Refresh the ad accounts list
      fetchAdAccounts();
    }
  }, [toast]);

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
                  {[
                    { name: 'Google Ads', description: 'Connect your Google Ads account' },
                    { name: 'Facebook Ads', description: 'Connect your Facebook Ads account' },
                    { name: 'TikTok Ads', description: 'Connect your TikTok Ads account' }
                  ].map((platform) => (
                    <div key={platform.name} 
                         className="p-6 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900">{platform.name}</h3>
                        <p className="text-sm text-gray-500">{platform.description}</p>
                      </div>
                      <Button
                        onClick={() => handleConnect(platform.name)}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Connect
                      </Button>
                    </div>
                  ))}
                </div>

                {adAccounts.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
                    <div className="space-y-4">
                      {adAccounts.map((account) => (
                        <div key={account.id} 
                             className="p-6 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {account.account_name || account.account_id}
                            </h3>
                            <p className="text-sm text-gray-500">{account.platform}</p>
                          </div>
                          <Button
                            onClick={() => handleDelete(account.id)}
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
