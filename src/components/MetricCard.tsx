import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: number;
}

export function MetricCard({ title, value, description, trend }: MetricCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-google-gray truncate">{title}</CardTitle>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend >= 0 ? "text-google-green" : "text-google-red"
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp className="h-3 w-3 animate-bounce" />
            ) : (
              <TrendingDown className="h-3 w-3 animate-bounce" />
            )}
            <span className="animate-fade-in whitespace-nowrap">
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold text-google-blue animate-fade-in truncate">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 animate-fade-in line-clamp-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}