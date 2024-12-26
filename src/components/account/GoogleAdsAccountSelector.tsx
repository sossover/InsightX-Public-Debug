import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface GoogleAdsAccount {
  id: string;
  name: string;
  customerId: string;
}

interface GoogleAdsAccountSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: GoogleAdsAccount[];
  onAccountsSelected: () => void;
}

export function GoogleAdsAccountSelector({ 
  isOpen, 
  onClose, 
  accounts,
  onAccountsSelected 
}: GoogleAdsAccountSelectorProps) {
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
        description: "Please select at least one Google Ads account to connect.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const selectedAccountsArray = accounts.filter(account => 
        selectedAccounts.has(account.id)
      );

      // Insert selected accounts into Supabase
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("No authenticated user found");

      for (const account of selectedAccountsArray) {
        const { error } = await supabase.from('ad_accounts').insert({
          user_id: userData.user.id,
          platform: 'Google Ads',
          account_id: account.customerId,
          account_name: account.name,
          is_active: true,
        });

        if (error) {
          console.error('Error inserting account:', error);
          throw error;
        }
      }

      toast({
        title: "Success",
        description: `Successfully connected ${selectedAccounts.size} Google Ads ${
          selectedAccounts.size === 1 ? 'account' : 'accounts'
        }`,
      });

      onAccountsSelected();
      onClose();
    } catch (error) {
      console.error('Error connecting accounts:', error);
      toast({
        title: "Error",
        description: "Failed to connect the selected accounts. Please try again.",
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
          <DialogTitle>Select Google Ads Accounts</DialogTitle>
        </DialogHeader>
        <div className="py-4">
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
                  <p className="text-sm text-gray-500">ID: {account.customerId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? "Connecting..." : "Connect Selected"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}