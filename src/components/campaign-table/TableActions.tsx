import { Button } from "@/components/ui/button";
import { Download, Loader2, RefreshCw } from "lucide-react";
import { DateRange } from "react-day-picker";

interface TableActionsProps {
  useSampleData: boolean;
  onExport: () => void;
  onSync: () => void;
  isSyncing: boolean;
  dateRange?: DateRange;
  selectedAccountId?: string;
}

export function TableActions({
  useSampleData,
  onExport,
  onSync,
  isSyncing,
  dateRange,
  selectedAccountId
}: TableActionsProps) {
  return (
    <div className="flex justify-between">
      <Button
        onClick={onExport}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export to CSV
      </Button>
      <Button
        onClick={onSync}
        disabled={isSyncing || !selectedAccountId}
        className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600"
      >
        {isSyncing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <RefreshCw className="w-4 h-4" />
        )}
        {isSyncing ? "Syncing..." : "Sync Campaign Data"}
      </Button>
    </div>
  );
}