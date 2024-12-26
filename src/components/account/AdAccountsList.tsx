import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteAccountDialog } from "./DeleteAccountDialog";

interface AdAccount {
  id: string;
  platform: string;
  account_id: string;
  account_name: string | null;
}

interface AdAccountsListProps {
  adAccounts: AdAccount[];
  onAccountsChange: () => void;
}

export function AdAccountsList({ adAccounts, onAccountsChange }: AdAccountsListProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDeleteClick = (id: string) => {
    setSelectedAccountId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAccountId) return;

    try {
      // First, delete all campaigns associated with this account
      const { error: campaignsError } = await supabase
        .from('campaigns')
        .delete()
        .eq('account_id', selectedAccountId);

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
        .eq('id', selectedAccountId);

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
      
      onAccountsChange();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (adAccounts.length === 0) return null;

  return (
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
              onClick={() => handleDeleteClick(account.id)}
              variant="ghost"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <DeleteAccountDialog 
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}