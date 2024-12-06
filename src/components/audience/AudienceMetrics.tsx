import { MetricCard } from "@/components/MetricCard";

interface AudienceMetricsProps {
  totalUsers: number;
  avgEngagement: number;
  totalGrowth: number;
}

export function AudienceMetrics({ totalUsers, avgEngagement, totalGrowth }: AudienceMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard
        title="Total Users"
        value={totalUsers.toLocaleString()}
        trend={15}
        description="Active users across all age groups"
      />
      <MetricCard
        title="Average Engagement"
        value={`${avgEngagement.toFixed(1)}%`}
        trend={8}
        description="Average engagement rate"
      />
      <MetricCard
        title="Monthly Growth"
        value={`${totalGrowth.toFixed(1)}%`}
        trend={totalGrowth}
        description="Combined growth across segments"
      />
      <MetricCard
        title="Active Segments"
        value="6"
        trend={0}
        description="Number of active age segments"
      />
    </div>
  );
}