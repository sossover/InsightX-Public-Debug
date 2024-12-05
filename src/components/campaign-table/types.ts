export interface Campaign {
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: string;
  conversions: number;
  cpa: number;
  keyword?: string; // Added to fix KeywordAnalysis component
}

export interface CampaignTableProps {
  useSampleData?: boolean;
  onCampaignsChange?: (campaigns: Campaign[]) => void;
}