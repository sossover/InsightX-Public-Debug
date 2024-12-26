import { MetricCard } from "@/components/MetricCard";
import { Campaign } from "@/components/campaign-table/types";

interface DashboardMetricsProps {
  metrics: {
    spend: number;
    impressions: number;
    clicks: number;
    conversions: number;
  };
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  return (
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
  );
}