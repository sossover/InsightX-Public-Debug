import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { CampaignTableHeader } from "./campaign-table/CampaignTableHeader";
import { CampaignTableRow } from "./campaign-table/CampaignTableRow";
import { Campaign, CampaignTableProps } from "./campaign-table/types";
import { defaultCampaigns, generateSampleData } from "./campaign-table/data";

export function CampaignTable({ useSampleData = false, onCampaignsChange }: CampaignTableProps) {
  const [sampleData, setSampleData] = useState(generateSampleData());
  const campaigns = useSampleData ? sampleData : defaultCampaigns;

  useEffect(() => {
    if (useSampleData) {
      setSampleData(generateSampleData());
    }
    onCampaignsChange?.(campaigns);
  }, [useSampleData]); // Only regenerate when useSampleData changes

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Table>
        <CampaignTableHeader />
        <TableBody>
          {campaigns.map((campaign) => (
            <CampaignTableRow key={campaign.name} campaign={campaign} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}