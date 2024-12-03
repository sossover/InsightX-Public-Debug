import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
}

export function MetricCard({ title, value, description, trend }: MetricCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-google-gray">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-google-blue">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend !== undefined && (
          <div className={`text-xs mt-1 ${trend >= 0 ? "text-google-green" : "text-google-red"}`}>
            {trend > 0 ? "+" : ""}
            {trend}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}