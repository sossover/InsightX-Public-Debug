import { Zap } from "lucide-react";

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-google-green" />
        <h3 className="font-semibold text-sm">Recommendations</h3>
      </div>
      <ul className="text-sm text-gray-600 space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
            <span>{recommendation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}