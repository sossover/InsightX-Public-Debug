import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertCircle, Zap } from "lucide-react";

export function AiInsights() {
  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200">
      <CardHeader className="flex flex-row items-center gap-2 border-b border-gray-100 pb-6">
        <Lightbulb className="h-5 w-5 text-google-blue" />
        <CardTitle className="text-lg">AI Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-google-blue" />
            <h3 className="font-semibold text-sm">Performance Summary</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your campaigns are performing well overall, with a 2.02% CTR on your top performing campaign.
            However, there's room for optimization in your In-Market audiences campaign.
          </p>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-google-yellow" />
            <h3 className="font-semibold text-sm">Key Observations</h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
              <span>Competitor keyword campaigns show strong engagement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
              <span>In-Market audience CPA is significantly higher than other campaigns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
              <span>Budget utilization is at 54% of the allocated amount</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-google-green" />
            <h3 className="font-semibold text-sm">Recommendations</h3>
          </div>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
              <span>Consider increasing budget for high-performing competitor campaigns</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
              <span>Review and refine In-Market audience targeting to improve CPA</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="block w-1 h-1 rounded-full bg-gray-400 mt-2" />
              <span>Optimize ad scheduling based on peak performance hours</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}