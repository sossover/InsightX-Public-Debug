import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CampaignTable } from "@/components/CampaignTable";
import { AiInsights } from "@/components/AiInsights";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { Logo } from "@/components/Logo";
import { CalendarDays, Filter } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <Logo />
                  <div className="flex items-center gap-4">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Campaigns</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-2 text-sm text-google-gray bg-white px-4 py-2 rounded-md border">
                      <CalendarDays className="h-4 w-4" />
                      <span>26 Nov 2024 - 2 Dec 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 text-sm text-google-gray hover:text-google-blue px-4 py-2 rounded-md border hover:border-google-blue transition-colors">
                    <Filter className="h-4 w-4" />
                    Advanced Filters
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Metrics Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <MetricCard
                  title="Total Spend"
                  value="$36,718.36"
                  description="vs $67,410 budget"
                  trend={-12}
                />
                <MetricCard
                  title="Impressions"
                  value="1,234,567"
                  trend={8}
                />
                <MetricCard
                  title="Clicks"
                  value="23,456"
                  description="2.1% CTR"
                  trend={15}
                />
                <MetricCard
                  title="Conversions"
                  value="256"
                  description="$143.43 CPA"
                  trend={5}
                />
              </div>

              {/* Charts Row */}
              <div className="grid gap-6 mb-8">
                <PerformanceChart />
              </div>

              {/* Two Column Layout */}
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-google-gray mb-6">Campaign Performance</h2>
                    <CampaignTable />
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <AiInsights />
                </div>
              </div>
            </div>
          </main>
        </div>

        <MetricsSidebar />
      </div>
    </SidebarProvider>
  );
};

export default Index;