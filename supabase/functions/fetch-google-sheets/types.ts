export interface Campaign {
  date: string;
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface DateRange {
  from: string;
  to: string;
}