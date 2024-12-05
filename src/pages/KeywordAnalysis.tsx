import { useState } from "react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KeywordHeader } from "@/components/keyword-analysis/KeywordHeader";
import { KeywordFilters } from "@/components/keyword-analysis/KeywordFilters";
import { KeywordTable } from "@/components/keyword-analysis/KeywordTable";
import { KeywordInsights } from "@/components/keyword-analysis/KeywordInsights";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Campaign } from "@/components/campaign-table/types";

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
              <KeywordFilters />
              <div className="overflow-x-auto">
                <KeywordTable data={campaigns} />
              </div>
              <div className="mt-6">
                <KeywordInsights campaigns={campaigns} />
              </div>
            </div>
          </main>
        </div>

        <ChatPanel />
      </div>
    </SidebarProvider>
  );
};

export default KeywordAnalysis;
