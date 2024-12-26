import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { CampaignTableHeader } from "./campaign-table/CampaignTableHeader";
import { CampaignTableRow } from "./campaign-table/CampaignTableRow";
import { Campaign, CampaignTableProps } from "./campaign-table/types";
import { defaultCampaigns, generateSampleData } from "./campaign-table/data";
import { Loader2 } from "lucide-react";

export function CampaignTable({ useSampleData = false, onCampaignsChange, isLoading = false }: CampaignTableProps) {
  const [sampleData, setSampleData] = useState(generateSampleData());
  const campaigns = useSampleData ? sampleData : defaultCampaigns;

  useEffect(() => {
    if (useSampleData) {
      setSampleData(generateSampleData());
    }
    onCampaignsChange?.(campaigns);
  }, [useSampleData, campaigns, onCampaignsChange]);

  // Calculate totals
  const totals: Campaign = {
    name: "Total",
    spend: campaigns.reduce((sum, campaign) => sum + campaign.spend, 0),
    impressions: campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0),
    clicks: campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0),
    conversions: campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0),
    get ctr() {
      return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
    },
    get cpa() {
      return this.conversions > 0 ? this.spend / this.conversions : 0;
    },
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <Table>
        <CampaignTableHeader />
        <TableBody>
          {campaigns.map((campaign) => (
            <CampaignTableRow key={campaign.name} campaign={campaign} />
          ))}
          <CampaignTableRow campaign={totals} isTotal />
        </TableBody>
      </Table>
    </div>
  );
}