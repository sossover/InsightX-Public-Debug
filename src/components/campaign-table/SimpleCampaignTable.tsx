import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Campaign } from "./types";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface SimpleCampaignTableProps {
  campaigns: Campaign[];
  dateRange?: DateRange;
}

export function SimpleCampaignTable({ campaigns, dateRange }: SimpleCampaignTableProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Campaign</TableHead>
            <TableHead className="text-right font-semibold">Cost</TableHead>
            <TableHead className="text-right font-semibold">Impressions</TableHead>
            <TableHead className="text-right font-semibold">Date Range</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.name} className="hover:bg-gray-50">
              <TableCell>{campaign.name}</TableCell>
              <TableCell className="text-right">${campaign.spend.toFixed(2)}</TableCell>
              <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                {dateRange?.from && dateRange?.to ? (
                  `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
                ) : (
                  'Date range not selected'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}