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
import { useState } from "react";
import { Footer } from "@/components/Footer";

const defaultMetrics = {
  spend: 8577.40,
  impressions: 850987,
  clicks: 16540,
  conversions: 253,
};

const generateSampleMetrics = () => ({
  spend: Math.random() * 15000 + 8000,
  impressions: Math.floor(Math.random() * 1500000 + 800000),
  clicks: Math.floor(Math.random() * 30000 + 15000),
  conversions: Math.floor(Math.random() * 600 + 200),
});

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [useSampleData, setUseSampleData] = useState(false);
  const [sampleMetrics, setSampleMetrics] = useState(generateSampleMetrics());
  
  const currentMetrics = useSampleData ? sampleMetrics : defaultMetrics;

  const handleSampleDataToggle = () => {
    if (!useSampleData || useSampleData) {
      setSampleMetrics(generateSampleMetrics());
    }
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
                  value={`$${currentMetrics.spend.toLocaleString()}`}
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
                  <CampaignTable useSampleData={useSampleData} />
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