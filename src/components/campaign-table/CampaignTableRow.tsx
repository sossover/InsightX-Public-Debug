import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Campaign } from "./types";

interface CampaignTableRowProps {
  campaign: Campaign;
}

export function CampaignTableRow({ campaign }: CampaignTableRowProps) {
  return (
    <TableRow key={campaign.name} className="hover:bg-gray-50">
      <TableCell className="font-medium">{campaign.name}</TableCell>
      <TableCell className="text-right">${campaign.spend.toFixed(2)}</TableCell>
      <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
      <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
      <TableCell className="text-right">{campaign.ctr}</TableCell>
      <TableCell className="text-right">{campaign.conversions}</TableCell>
      <TableCell className="text-right">${campaign.cpa.toFixed(2)}</TableCell>
    </TableRow>
  );
}