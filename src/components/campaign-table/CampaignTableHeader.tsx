import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CampaignTableHeaderProps {
  onSort: (column: string) => void;
}

export function CampaignTableHeader({ onSort }: CampaignTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="font-semibold">
          <Button variant="ghost" onClick={() => onSort('name')} className="p-0 hover:bg-transparent">
            Campaign
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-right font-semibold">
          <Button variant="ghost" onClick={() => onSort('spend')} className="p-0 hover:bg-transparent ml-auto">
            Spend
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-right font-semibold">
          <Button variant="ghost" onClick={() => onSort('impressions')} className="p-0 hover:bg-transparent ml-auto">
            Impressions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-right font-semibold">
          <Button variant="ghost" onClick={() => onSort('clicks')} className="p-0 hover:bg-transparent ml-auto">
            Clicks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-right font-semibold">
          <Button variant="ghost" onClick={() => onSort('ctr')} className="p-0 hover:bg-transparent ml-auto">
            CTR
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-right font-semibold">
          <Button variant="ghost" onClick={() => onSort('conversions')} className="p-0 hover:bg-transparent ml-auto">
            Conversions
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-right font-semibold">
          <Button variant="ghost" onClick={() => onSort('cpa')} className="p-0 hover:bg-transparent ml-auto">
            CPA
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}