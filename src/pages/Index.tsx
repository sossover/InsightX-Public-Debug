import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CampaignTable } from "@/components/CampaignTable";
import { AiInsights } from "@/components/AiInsights";
import { CalendarDays } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-google-blue">Campaign Analytics</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-google-gray bg-white px-4 py-2 rounded-md border">
                <CalendarDays className="h-4 w-4" />
                <span>26 Nov 2024 - 2 Dec 2024</span>
              </div>
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
  );
};

export default Index;