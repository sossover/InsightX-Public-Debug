import { AiInsights } from "@/components/AiInsights";
import { Campaign } from "@/components/campaign-table/types";

interface KeywordInsightsProps {
  campaigns: Campaign[];
}

export function KeywordInsights({ campaigns }: KeywordInsightsProps) {
  return <AiInsights campaigns={campaigns} />;
}