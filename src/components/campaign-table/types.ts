export interface Campaign {
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: string;
  conversions: number;
  cpa: number;
}

export interface CampaignTableProps {
  useSampleData?: boolean;
  onCampaignsChange?: (campaigns: Campaign[]) => void;
}