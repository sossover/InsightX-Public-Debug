import { Campaign } from "@/components/campaign-table/types";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CampaignTable } from "@/components/CampaignTable";
import { AiInsights } from "@/components/AiInsights";
import { Button } from "@/components/ui/button";
import { DashboardMetrics } from "./DashboardMetrics";

interface DashboardContentProps {
  useSampleData: boolean;
  handleSampleDataToggle: () => void;
  campaigns: Campaign[];
  metrics: {
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
  };
  onCampaignsChange: (campaigns: Campaign[]) => void;
}

export function DashboardContent({
  useSampleData,
  handleSampleDataToggle,
  campaigns,
  metrics,
  onCampaignsChange,
}: DashboardContentProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <Button 
          variant="outline" 
          onClick={handleSampleDataToggle}
          className="mb-2 w-full sm:w-auto"
        >
          {useSampleData ? "Use Real Data" : "Sample Data"}
        </Button>
      </div>

      <DashboardMetrics metrics={metrics} />

      <div className="grid grid-cols-1 gap-6 mb-6 performance-chart">
        <PerformanceChart useSampleData={useSampleData} />
      </div>

      <div className="grid grid-cols-1 gap-6 campaign-table">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 overflow-x-auto dark:bg-custom-purple-600 dark:border-custom-purple-400">
          <h2 className="text-lg font-semibold text-google-gray mb-6 dark:text-white">Campaign Performance</h2>
          <CampaignTable 
            useSampleData={useSampleData} 
            onCampaignsChange={onCampaignsChange}
          />
        </div>
      </div>

      <div className="mt-6 ai-insights">
        <AiInsights campaigns={campaigns} />
      </div>
    </div>
  );
}