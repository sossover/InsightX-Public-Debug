import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export function AiInsights() {
  return (
    <Card className="bg-gradient-to-br from-google-blue/5 to-google-blue/10">
      <CardHeader className="flex flex-row items-center gap-2">
        <Lightbulb className="h-6 w-6 text-google-blue" />
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Performance Summary</h3>
          <p className="text-sm text-gray-600">
            Your campaigns are performing well overall, with a 2.02% CTR on your top performing campaign.
            However, there's room for optimization in your In-Market audiences campaign.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Key Observations</h3>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
            <li>Competitor keyword campaigns show strong engagement</li>
            <li>In-Market audience CPA is significantly higher than other campaigns</li>
            <li>Budget utilization is at 54% of the allocated amount</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Recommendations</h3>
          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
            <li>Consider increasing budget for high-performing competitor campaigns</li>
            <li>Review and refine In-Market audience targeting to improve CPA</li>
            <li>Optimize ad scheduling based on peak performance hours</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}