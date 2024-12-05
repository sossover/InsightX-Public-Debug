import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AiInsightHeader } from "./ai-insights/AiInsightHeader";
import { PerformanceSummary } from "./ai-insights/PerformanceSummary";
import { KeyObservations } from "./ai-insights/KeyObservations";
import { Recommendations } from "./ai-insights/Recommendations";

interface InsightsData {
  summary: string;
  observations: string[];
  recommendations: string[];
}

interface Campaign {
  name: string;
  spend: number;
  impressions: number;
  clicks: number;
  ctr: string;
  conversions: number;
  cpa: number;
}

interface AiInsightsProps {
  campaigns: Campaign[];
  deviceData?: Array<{ name: string; value: number; color: string }>;
  countryData?: Array<{ country: string; spend: number; impressions: number; clicks: number; conversions: number }>;
  keywordData?: Array<Campaign>;
}

export function AiInsights({ campaigns, deviceData, countryData, keywordData }: AiInsightsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const { toast } = useToast();

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      // Use the provided data or empty arrays as fallbacks
      const dataToAnalyze = {
        campaignData: campaigns,
        deviceData: deviceData || [],
        countryData: countryData || [],
        keywordData: keywordData || [],
      };

      const { data, error } = await supabase.functions.invoke('generate-insights', {
        body: dataToAnalyze
      });

      if (error) throw error;

      console.log('Response from Edge Function:', data);

      if (!data.insights || typeof data.insights.summary !== 'string' || 
          !Array.isArray(data.insights.observations) || !Array.isArray(data.insights.recommendations)) {
        throw new Error('Invalid response format from server');
      }

      setInsights(data.insights);
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
      <AiInsightHeader onGenerate={generateInsights} isLoading={isLoading} />
      <CardContent className="space-y-6 pt-6">
        {insights ? (
          <>
            <PerformanceSummary summary={insights.summary} />
            <KeyObservations observations={insights.observations} />
            <Recommendations recommendations={insights.recommendations} />
          </>
        ) : (
          <div className="text-center text-gray-500 py-8">
            Click generate to get AI-powered insights about your campaign performance
          </div>
        )}
      </CardContent>
    </Card>
  );
}