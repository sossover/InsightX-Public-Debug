import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
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
    const { error } = await supabase
      .from('ad_accounts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting ad account",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ad account removed",
      description: "The ad account has been successfully removed.",
    });
    
    fetchAdAccounts();
  };

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

                <div className="grid gap-4 mb-8">
                  {['Google Ads', 'Facebook Ads', 'TikTok Ads'].map((platform) => (
                    <div key={platform} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{platform}</h3>
                        <p className="text-sm text-gray-500">Connect your {platform} account</p>
                      </div>
                      <Button
                        onClick={() => handleConnect(platform)}
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
                    <div className="grid gap-4">
                      {adAccounts.map((account) => (
                        <div key={account.id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{account.account_name || account.account_id}</h3>
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