import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { CampaignTable } from "@/components/CampaignTable";
import { AiInsights } from "@/components/AiInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-google-gray">Google Ads Dashboard</h1>
          <div className="text-sm text-google-gray">26 Nov 2024 - 2 Dec 2024</div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <PerformanceChart />
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-google-gray">Campaign Performance</h2>
            <CampaignTable />
          </div>
          <div>
            <AiInsights />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;