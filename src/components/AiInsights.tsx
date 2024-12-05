import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertCircle, Zap, RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function AiInsights() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      // Get data from the campaign table component
      const campaignData = [
        {
          name: "Performance Max - Competitor KW",
          spend: 4614.52,
          impressions: 780417,
          clicks: 15769,
          ctr: "2.02%",
          conversions: 250,
          cpa: 18.44,
        },
        {
          name: "Performance Max - In-Market",
          spend: 3962.88,
          impressions: 70570,
          clicks: 771,
          ctr: "1.09%",
          conversions: 3,
          cpa: 1062.01,
        },
        {
          name: "Search - Brand Terms",
          spend: 2845.65,
          impressions: 125890,
          clicks: 8965,
          ctr: "7.12%",
          conversions: 425,
          cpa: 6.70,
        },
        {
          name: "Display - Remarketing",
          spend: 1578.92,
          impressions: 458962,
          clicks: 3256,
          ctr: "0.71%",
          conversions: 85,
          cpa: 18.58,
        },
      ];

      const deviceData = [
        { name: "DESKTOP", value: 95.1, color: "#4285F4" },
        { name: "MOBILE", value: 3.8, color: "#34A853" },
        { name: "TABLET", value: 1.1, color: "#EA4335" },
      ];

      const countryData = [
        { country: "Brazil", spend: 108.79, impressions: 1322, clicks: 56, conversions: 7 },
        { country: "Spain", spend: 66.3, impressions: 3840, clicks: 46, conversions: 0 },
        { country: "United Kingdom", spend: 60.72, impressions: 1250, clicks: 22, conversions: 0 },
      ];

      const { data, error } = await supabase.functions.invoke('generate-insights', {
        body: { campaignData, deviceData, countryData }
      });

      if (error) throw error;

      const insights = JSON.parse(data.insights);

      // Update the UI with new insights
      // For now, we'll just show a success message
      toast({
        title: "Insights Generated",
        description: "New AI insights have been generated successfully.",
      });

    } catch (error) {
      console.error('Error generating insights:', error);
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-google-blue" />
          <CardTitle className="text-lg">AI Insights</CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={generateInsights}
          disabled={isLoading}
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Generate
        </Button>
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