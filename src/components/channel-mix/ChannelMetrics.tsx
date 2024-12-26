import { MetricCard } from "@/components/MetricCard";

interface ChannelMetricsProps {
  totalSpend: number;
  totalConversions: number;
  averageCPA: number;
  channelCount: number;
  overallTrend: number;
}

export function ChannelMetrics({
  totalSpend,
  totalConversions,
  averageCPA,
  channelCount,
  overallTrend
}: ChannelMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Total Marketing Spend"
        value={`$${totalSpend.toLocaleString()}`}
        trend={5.2}
      />
      <MetricCard
        title="Total Conversions"
        value={totalConversions}
        trend={3.8}
      />
      <MetricCard
        title="Average CPA"
        value={`$${averageCPA.toFixed(2)}`}
        trend={-2.1}
      />
      <MetricCard
        title="Active Channels"
        value={channelCount}
        description="Across all marketing activities"
      />
    </div>
  );
}