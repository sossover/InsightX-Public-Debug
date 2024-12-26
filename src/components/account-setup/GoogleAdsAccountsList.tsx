import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface GoogleAdsAccount {
  id: string;
  name: string;
  currencyCode: string;
  timeZone: string;
}

interface GoogleAdsAccountsListProps {
  accounts: GoogleAdsAccount[];
  selectedAccounts: Set<string>;
  onToggleAccount: (accountId: string) => void;
}

export function GoogleAdsAccountsList({ accounts, selectedAccounts, onToggleAccount }: GoogleAdsAccountsListProps) {
  return (
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
              onClick={() => onToggleAccount(account.id)}
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
  );
}