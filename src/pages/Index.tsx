import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CampaignTable } from "@/components/CampaignTable";
import { AiInsights } from "@/components/AiInsights";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { Logo } from "@/components/Logo";
import { CalendarDays, Menu } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { Footer } from "@/components/Footer";
import { Campaign } from "@/components/campaign-table/types";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [useSampleData, setUseSampleData] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const isMobile = useIsMobile();

  const metrics = useMemo(() => {
    const totals = campaigns.reduce(
      (acc, campaign) => ({
        spend: acc.spend + campaign.spend,
        impressions: acc.impressions + campaign.impressions,
        clicks: acc.clicks + campaign.clicks,
        conversions: acc.conversions + campaign.conversions,
      }),
      { spend: 0, impressions: 0, clicks: 0, conversions: 0 }
    );

    return totals;
  }, [campaigns]);

  const handleSampleDataToggle = () => {
    setUseSampleData(!useSampleData);
  };

  const handleCampaignsChange = (newCampaigns: Campaign[]) => {
    setCampaigns(newCampaigns);
  };

  const renderMetricsSidebar = () => {
    if (isMobile) {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <MetricsSidebar />
          </SheetContent>
        </Sheet>
      );
    }
    return <MetricsSidebar />;
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
                <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto">
                  <Logo />
                  <div className="flex items-center gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[140px] sm:w-[240px] justify-start text-left font-normal">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          <span className="truncate">
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </span>
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
                  className="mb-2 w-full sm:w-auto"
                >
                  {useSampleData ? "Use Real Data" : "Sample Data"}
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                  title="Total Spend"
                  value={`$${metrics.spend.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                  trend={12}
                />
                <MetricCard
                  title="Impressions"
                  value={metrics.impressions.toLocaleString()}
                  trend={-5}
                />
                <MetricCard
                  title="Clicks"
                  value={metrics.clicks.toLocaleString()}
                  trend={8}
                />
                <MetricCard
                  title="Conversions"
                  value={metrics.conversions.toLocaleString()}
                  trend={15}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6">
                <PerformanceChart useSampleData={useSampleData} />
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 overflow-x-auto">
                  <h2 className="text-lg font-semibold text-google-gray mb-6">Campaign Performance</h2>
                  <CampaignTable 
                    useSampleData={useSampleData} 
                    onCampaignsChange={handleCampaignsChange}
                  />
                </div>
              </div>

              <div className="mt-6">
                <AiInsights campaigns={campaigns} />
              </div>
            </div>
          </main>

          <Footer />
        </div>

        {renderMetricsSidebar()}
      </div>
    </SidebarProvider>
  );
};

export default Index;