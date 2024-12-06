import { useState } from "react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KeywordHeader } from "@/components/keyword-analysis/KeywordHeader";
import { KeywordFilters } from "@/components/keyword-analysis/KeywordFilters";
import { KeywordTable } from "@/components/keyword-analysis/KeywordTable";
import { KeywordInsights } from "@/components/keyword-analysis/KeywordInsights";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Campaign } from "@/components/campaign-table/types";
import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";

const keywordData: Campaign[] = [
  {
    name: "supermetrics",
    spend: 62.31,
    impressions: 484,
    clicks: 9,
    ctr: "1.86%",
    conversions: 2,
    cpa: 31.15,
  },
  {
    name: "looker studio meta ads",
    spend: 43.66,
    impressions: 190,
    clicks: 13,
    ctr: "6.84%",
    conversions: 1,
    cpa: 1062.01,
  },
  {
    name: "salesforce bigquery",
    spend: 33.55,
    impressions: 141,
    clicks: 9,
    ctr: "6.38%",
    conversions: 0,
    cpa: 0,
  },
  {
    name: "meta looker studio",
    spend: 22.05,
    impressions: 149,
    clicks: 9,
    ctr: "6.04%",
    conversions: 0,
    cpa: 0,
  },
  {
    name: "powerbi google ads",
    spend: 18.45,
    impressions: 61,
    clicks: 6,
    ctr: "9.84%",
    conversions: 2,
    cpa: 9.23,
  },
];

const KeywordAnalysis = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [campaigns, setCampaigns] = useState(keywordData);

  // Calculate metrics for the cards
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const avgCTR = ((totalClicks / totalImpressions) * 100).toFixed(2) + "%";
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <KeywordHeader date={date} setDate={setDate} />

          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard
                  title="Total Clicks"
                  value={totalClicks}
                  trend={12}
                  description="Total clicks across all keywords"
                />
                <MetricCard
                  title="Impressions"
                  value={totalImpressions}
                  trend={8}
                  description="Total impressions across all keywords"
                />
                <MetricCard
                  title="Average CTR"
                  value={avgCTR}
                  trend={-3}
                  description="Click-through rate across all keywords"
                />
                <MetricCard
                  title="Conversions"
                  value={totalConversions}
                  trend={15}
                  description="Total conversions from keywords"
                />
              </div>

              {/* Performance Chart */}
              <div className="mb-8">
                <PerformanceChart useSampleData={true} />
              </div>

              {/* Main Content Area */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Keyword Analysis */}
                <div className="lg:col-span-2 space-y-6">
                  <KeywordFilters />
                  <div className="overflow-x-auto">
                    <KeywordTable data={campaigns} />
                  </div>
                </div>

                {/* Right Column - AI Insights */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <KeywordInsights campaigns={campaigns} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <ChatPanel campaignData={campaigns} />
      </div>
    </SidebarProvider>
  );
};

export default KeywordAnalysis;