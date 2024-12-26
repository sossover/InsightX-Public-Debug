import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AdAccount {
  id: string;
  platform: string;
  account_name: string;
  account_id: string;
}

interface AdAccountSelectorProps {
  onAccountChange?: (accountId: string) => void;
  className?: string;
}

export function AdAccountSelector({ onAccountChange, className = "" }: AdAccountSelectorProps) {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const { data, error } = await supabase
          .from('ad_accounts')
          .select('*')
          .eq('is_active', true);

        if (error) throw error;

        setAccounts(data || []);
        if (data && data.length > 0 && !selectedAccount) {
          setSelectedAccount(data[0].id);
          onAccountChange?.(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching ad accounts:', error);
        toast({
          title: "Error",
          description: "Failed to load ad accounts. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchAccounts();
  }, []);

  const handleAccountChange = (value: string) => {
    setSelectedAccount(value);
    onAccountChange?.(value);
  };

  if (isLoading) {
    return (
      <Select disabled>
        <SelectTrigger className={className}>
          <SelectValue placeholder="Loading accounts..." />
        </SelectTrigger>
      </Select>
    );
  }

  if (accounts.length === 0) {
    return (
      <Select disabled>
        <SelectTrigger className={className}>
          <SelectValue placeholder="No accounts connected" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={selectedAccount} onValueChange={handleAccountChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.account_name || account.account_id} ({account.platform})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}