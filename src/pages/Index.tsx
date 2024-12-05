import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CampaignTable } from "@/components/CampaignTable";
import { AiInsights } from "@/components/AiInsights";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { Logo } from "@/components/Logo";
import { CalendarDays } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { Footer } from "@/components/Footer";

const calculateMetricsFromCampaigns = (campaigns: any[]) => {
  return campaigns.reduce((acc, campaign) => ({
    spend: acc.spend + campaign.spend,
    impressions: acc.impressions + campaign.impressions,
    clicks: acc.clicks + campaign.clicks,
    conversions: acc.conversions + campaign.conversions,
  }), {
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
  });
};

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

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [useSampleData, setUseSampleData] = useState(false);
  const [campaigns, setCampaigns] = useState(defaultCampaigns);
  
  const currentMetrics = useMemo(() => calculateMetricsFromCampaigns(campaigns), [campaigns]);

  const handleSampleDataToggle = () => {
    setUseSampleData(!useSampleData);
  };

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Fixed Navigation */}
          <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <Logo />
                  <div className="flex items-center gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content with proper top padding */}
          <main className="flex-1 flex flex-col justify-center pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  onClick={handleSampleDataToggle}
                  className="mb-2"
                >
                  {useSampleData ? "Use Real Data" : "Sample Data"}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <MetricCard
                  title="Total Spend"
                  value={`$${currentMetrics.spend.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  trend={12}
                />
                <MetricCard
                  title="Impressions"
                  value={currentMetrics.impressions.toLocaleString()}
                  trend={-5}
                />
                <MetricCard
                  title="Clicks"
                  value={currentMetrics.clicks.toLocaleString()}
                  trend={8}
                />
                <MetricCard
                  title="Conversions"
                  value={currentMetrics.conversions.toLocaleString()}
                  trend={15}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <PerformanceChart useSampleData={useSampleData} />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-google-gray mb-6">Campaign Performance</h2>
                  <CampaignTable 
                    useSampleData={useSampleData} 
                    onCampaignsChange={setCampaigns}
                  />
                </div>
              </div>

              <div className="mt-6">
                <AiInsights />
              </div>
            </div>
          </main>

          <Footer />
        </div>

        <MetricsSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Index;