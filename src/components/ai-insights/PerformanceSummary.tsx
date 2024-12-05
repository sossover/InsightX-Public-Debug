import { TrendingUp } from "lucide-react";

interface PerformanceSummaryProps {
  summary: string;
}

export function PerformanceSummary({ summary }: PerformanceSummaryProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-google-blue" />
        <h3 className="font-semibold text-sm">Performance Summary</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">
        {summary}
      </p>
    </div>
  );
}