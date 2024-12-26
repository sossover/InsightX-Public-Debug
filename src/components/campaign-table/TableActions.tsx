import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface TableActionsProps {
  useSampleData: boolean;
  onExport: () => void;
  onSync: () => void;
}

export function TableActions({ useSampleData, onExport, onSync }: TableActionsProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onSync}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-4 w-4" />
        Sync Data
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export to CSV
      </Button>
    </div>
  );
}