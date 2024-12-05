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
  const [currentData, setCurrentData] = useState<Campaign[]>(defaultCampaigns);

  useEffect(() => {
    const data = useSampleData ? generateSampleData() : defaultCampaigns;
    setCurrentData(data);
    onCampaignsChange?.(data);
  }, [useSampleData, onCampaignsChange]);

  // Calculate totals
  const totals: Campaign = {
    name: "Total",
    spend: currentData.reduce((sum, campaign) => sum + campaign.spend, 0),
    impressions: currentData.reduce((sum, campaign) => sum + campaign.impressions, 0),
    clicks: currentData.reduce((sum, campaign) => sum + campaign.clicks, 0),
    conversions: currentData.reduce((sum, campaign) => sum + campaign.conversions, 0),
    get ctr() {
      return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
    },
    get cpa() {
      return this.conversions > 0 ? this.spend / this.conversions : 0;
    },
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Table>
        <CampaignTableHeader />
        <TableBody>
          {currentData.map((campaign) => (
            <CampaignTableRow key={campaign.name} campaign={campaign} />
          ))}
          <CampaignTableRow campaign={totals} isTotal />
        </TableBody>
      </Table>
    </div>
  );
}