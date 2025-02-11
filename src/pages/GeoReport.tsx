import { NavigationSidebar } from "@/components/NavigationSidebar";
import { GeoMap } from "@/components/GeoMap";
import { CountryStats } from "@/components/CountryStats";
import { DeviceStats } from "@/components/DeviceStats";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { PricingModal } from "@/components/PricingModal";
import { HelpDialog } from "@/components/HelpDialog";
import { ReportHeader } from "@/components/ReportHeader";
import { DateRange } from "react-day-picker";

const defaultCampaigns = [
  {
    name: "Performance Max - Competitor KW",
    spend: 4614.52,
    impressions: 780417,
    clicks: 15769,
    ctr: "2.02%",
    conversions: 250,
    cpa: 18.44,
  },
  {
    name: "Performance Max - In-Market",
    spend: 3962.88,
    impressions: 70570,
    clicks: 771,
    ctr: "1.09%",
    conversions: 3,
    cpa: 1062.01,
  },
  {
    name: "Search - Brand Terms",
    spend: 2845.65,
    impressions: 125890,
    clicks: 8965,
    ctr: "7.12%",
    conversions: 425,
    cpa: 6.70,
  },
  {
    name: "Display - Remarketing",
    spend: 1578.92,
    impressions: 458962,
    clicks: 3256,
    ctr: "0.71%",
    conversions: 85,
    cpa: 18.58,
  },
];

const deviceData = [
  { name: "DESKTOP", value: 95.1, color: "#4285F4" },
  { name: "MOBILE", value: 3.8, color: "#34A853" },
  { name: "TABLET", value: 1.1, color: "#EA4335" },
];

const countryData = [
  { country: "Brazil", spend: 108.79, impressions: 1322, clicks: 56, conversions: 7 },
  { country: "Spain", spend: 66.3, impressions: 3840, clicks: 46, conversions: 0 },
  { country: "United Kingdom", spend: 60.72, impressions: 1250, clicks: 22, conversions: 0 },
  { country: "Poland", spend: 48.43, impressions: 2052, clicks: 32, conversions: 0 },
  { country: "France", spend: 40.1, impressions: 3125, clicks: 28, conversions: 1 },
];

const GeoReport = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full bg-gray-50">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <ReportHeader
            title="Geographic Performance"
            description="Analyze performance across different regions"
            date={date}
            setDate={setDate}
            onAccountChange={setSelectedAccountId}
          />

          <main className="mt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                  title="Total Countries"
                  value="9"
                  description="Active campaign regions"
                  trend={12}
                />
                <MetricCard
                  title="Top Spending"
                  value="$108.79"
                  description="Highest country spend (Brazil)"
                  trend={8}
                />
                <MetricCard
                  title="Total Impressions"
                  value="15,152"
                  description="Across all regions"
                  trend={-3}
                />
                <MetricCard
                  title="Conversion Rate"
                  value="1.33%"
                  description="Average across regions"
                  trend={5}
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Map and Performance */}
                <div className="lg:col-span-2 space-y-6">
                  <GeoMap />
                  <PerformanceChart useSampleData={true} />
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                  <DeviceStats />
                  <CountryStats />
                </div>
              </div>
            </div>
          </main>

          <PricingModal 
            isOpen={isPricingOpen}
            onClose={() => setIsPricingOpen(false)}
          />

          <HelpDialog
            open={isHelpOpen}
            onOpenChange={setIsHelpOpen}
          />
        </div>

        <ChatPanel 
          countryData={countryData}
          campaignData={defaultCampaigns}
          deviceData={deviceData}
        />
      </div>
    </SidebarProvider>
  );
};

export default GeoReport;
