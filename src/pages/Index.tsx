import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CampaignTable } from "@/components/CampaignTable";
import { AiInsights } from "@/components/AiInsights";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { CalendarDays, ChevronDown } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState, useMemo } from "react";
import { Footer } from "@/components/Footer";
import { Campaign } from "@/components/campaign-table/types";
import { PricingModal } from "@/components/PricingModal";
import { HelpDialog } from "@/components/HelpDialog";
import { OnboardingTour } from "@/components/OnboardingTour";
import { cn } from "@/lib/utils";

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [useSampleData, setUseSampleData] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTopPanelOpen, setIsTopPanelOpen] = useState(false);

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

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Sliding Panel */}
          <div className="fixed w-full z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ease-in-out dark:bg-custom-purple-600/80 dark:border-custom-purple-400">
            <div className={cn(
              "transition-all duration-300 ease-in-out overflow-hidden",
              isTopPanelOpen ? "h-32" : "h-0"
            )}>
              <div className="p-4 flex justify-end space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsHelpOpen(true)}
                  className="text-gray-600 hover:text-google-blue transition-colors duration-200"
                >
                  Help
                </Button>
              </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
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
                <div className="flex items-center gap-4">
                  <Button
                    variant="default"
                    onClick={() => setIsPricingOpen(true)}
                    className="bg-custom-purple-500 hover:bg-custom-purple-600 text-white"
                  >
                    Upgrade Now
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsTopPanelOpen(!isTopPanelOpen)}
                  >
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isTopPanelOpen ? "transform rotate-180" : ""
                    )} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <main className="flex-1 flex flex-col pt-24">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 metrics-cards">
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

              <div className="grid grid-cols-1 gap-6 mb-6 performance-chart">
                <PerformanceChart useSampleData={useSampleData} />
              </div>

              <div className="grid grid-cols-1 gap-6 campaign-table">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 overflow-x-auto dark:bg-custom-purple-600 dark:border-custom-purple-400">
                  <h2 className="text-lg font-semibold text-google-gray mb-6 dark:text-white">Campaign Performance</h2>
                  <CampaignTable 
                    useSampleData={useSampleData} 
                    onCampaignsChange={handleCampaignsChange}
                  />
                </div>
              </div>

              <div className="mt-6 ai-insights">
                <AiInsights campaigns={campaigns} />
              </div>
            </div>
          </main>

          <Footer />
        </div>

        <PricingModal 
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
        />

        <HelpDialog
          open={isHelpOpen}
          onOpenChange={setIsHelpOpen}
        />

        <div className="chat-panel">
          <ChatPanel campaignData={campaigns} />
        </div>

        <OnboardingTour />
      </div>
    </SidebarProvider>
  );
};

export default Index;