import { DateRange } from "react-day-picker";

export interface Campaign {
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: string;
  cpa: number;
}

export interface CampaignTableProps {
  useSampleData?: boolean;
  onCampaignsChange?: (campaigns: Campaign[]) => void;
  isLoading?: boolean;
  dateRange?: DateRange | undefined;
  selectedAccountId?: string;
}