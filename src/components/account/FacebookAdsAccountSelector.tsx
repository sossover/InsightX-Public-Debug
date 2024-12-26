import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface FacebookAdsAccount {
  id: string;
  name: string;
  account_id: string;
  currency: string;
  timezone_name: string;
  account_status: string;
  access_token: string;
}

interface FacebookAdsAccountSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: FacebookAdsAccount[];
  onAccountsSelected: () => void;
}

export function FacebookAdsAccountSelector({ 
  isOpen, 
  onClose, 
  accounts,
  onAccountsSelected 
}: FacebookAdsAccountSelectorProps) {
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const toggleAccount = (accountId: string) => {
    const newSelected = new Set(selectedAccounts);
    if (newSelected.has(accountId)) {
      newSelected.delete(accountId);
    } else {
      newSelected.add(accountId);
    }
    setSelectedAccounts(newSelected);
  };

  const handleConnect = async () => {
    if (selectedAccounts.size === 0) {
      toast({
        title: "No accounts selected",
        description: "Please select at least one Facebook Ads account to connect.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const selectedAccountsArray = accounts.filter(account => 
        selectedAccounts.has(account.id)
      );

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("No authenticated user found");

      // Store each selected account
      for (const account of selectedAccountsArray) {
        console.log('Storing account with access token:', { accountId: account.account_id, hasToken: !!account.access_token });
        
        const { error } = await supabase.from('ad_accounts').insert({
          user_id: userData.user.id,
          platform: 'Facebook Ads',
          account_id: account.account_id,
          account_name: account.name,
          account_currency: account.currency,
          account_timezone: account.timezone_name,
          account_status: account.account_status,
          access_token: account.access_token, // Store the access token
          is_active: true,
        });

        if (error) {
          console.error('Error inserting account:', error);
          throw error;
        }
      }

      toast({
        title: "Success",
        description: `Successfully connected ${selectedAccounts.size} Facebook Ads ${
          selectedAccounts.size === 1 ? 'account' : 'accounts'
        }`,
      });

      onAccountsSelected();
      onClose();
    } catch (error) {
      console.error('Error connecting accounts:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to connect the selected accounts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Facebook Ads Accounts</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {accounts.length === 0 ? (
            <p className="text-center text-gray-500">No Facebook Ads accounts found. Make sure you have access to ad accounts in your Facebook Business Manager.</p>
          ) : (
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleAccount(account.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedAccounts.has(account.id)}
                    onChange={() => toggleAccount(account.id)}
                    className="h-4 w-4 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-gray-500">ID: {account.account_id}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={isLoading || accounts.length === 0}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect Selected"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}