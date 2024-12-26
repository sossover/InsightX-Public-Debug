import { useState, useEffect } from "react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { KeywordHeader } from "@/components/keyword-analysis/KeywordHeader";
import { KeywordFilters } from "@/components/keyword-analysis/KeywordFilters";
import { KeywordTable } from "@/components/keyword-analysis/KeywordTable";
import { KeywordInsights } from "@/components/keyword-analysis/KeywordInsights";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Campaign } from "@/components/campaign-table/types";
import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { PricingModal } from "@/components/PricingModal";
import { HelpDialog } from "@/components/HelpDialog";
import { ReportHeader } from "@/components/ReportHeader";
import { DateRange } from "react-day-picker";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const KeywordAnalysis = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Calculate metrics for the cards
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const avgCTR = ((totalClicks / totalImpressions) * 100).toFixed(2) + "%";
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);

  const fetchCampaignData = async () => {
    if (!selectedAccountId || !date?.from || !date?.to) return;
    
    setIsLoading(true);
    try {
      const fromDate = format(date.from, 'yyyy-MM-dd');
      const toDate = format(date.to, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('account_id', selectedAccountId)
        .gte('created_at', `${fromDate}T00:00:00`)
        .lte('created_at', `${toDate}T23:59:59`);

      if (error) {
        console.error('Error fetching campaigns:', error);
        toast({
          title: "Error",
          description: "Failed to fetch campaign data. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const formattedCampaigns: Campaign[] = data.map(campaign => ({
        name: campaign.name,
        spend: campaign.spend,
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        conversions: campaign.conversions,
        get ctr() {
          return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
        },
        get cpa() {
          return this.conversions > 0 ? this.spend / this.conversions : 0;
        }
      }));

      setCampaigns(formattedCampaigns);
      
      if (formattedCampaigns.length === 0) {
        toast({
          title: "No Data",
          description: "No campaign data found for the selected date range.",
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAccountId && date?.from && date?.to) {
      fetchCampaignData();
    }
  }, [selectedAccountId, date]);

  const handleAccountChange = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <ReportHeader 
            title="Keyword Analysis"
            description="Analyze your keyword performance and trends"
            date={date}
            setDate={setDate}
            onAccountChange={handleAccountChange}
          />

          <main className="flex-1 flex flex-col">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard
                  title="Total Clicks"
                  value={totalClicks}
                  trend={12}
                  description="Total clicks across all keywords"
                />
                <MetricCard
                  title="Impressions"
                  value={totalImpressions}
                  trend={8}
                  description="Total impressions across all keywords"
                />
                <MetricCard
                  title="Average CTR"
                  value={avgCTR}
                  trend={-3}
                  description="Click-through rate across all keywords"
                />
                <MetricCard
                  title="Conversions"
                  value={totalConversions}
                  trend={15}
                  description="Total conversions from keywords"
                />
              </div>

              {/* Performance Chart */}
              <div className="mb-8">
                <PerformanceChart useSampleData={!selectedAccountId} />
              </div>

              {/* Main Content Area */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Keyword Analysis */}
                <div className="lg:col-span-2 space-y-6">
                  <KeywordFilters />
                  <div className="overflow-x-auto">
                    <KeywordTable data={campaigns} />
                  </div>
                </div>

                {/* Right Column - AI Insights */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <KeywordInsights campaigns={campaigns} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <ChatPanel campaignData={campaigns} />
      </div>
    </SidebarProvider>
  );
};

export default KeywordAnalysis;