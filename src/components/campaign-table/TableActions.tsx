import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface TableActionsProps {
  useSampleData: boolean;
  onExport: () => void;
}

export function TableActions({
  useSampleData,
  onExport,
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
    </div>
  );
}