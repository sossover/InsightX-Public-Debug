import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { useState, useEffect, useCallback } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { CampaignTable } from "@/components/CampaignTable";
import { PerformanceChart } from "@/components/PerformanceChart";
import { AiInsights } from "@/components/AiInsights";
import { ReportHeader } from "@/components/ReportHeader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export default function CampaignPerformance() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCampaignData = useCallback(async (accountId: string, selectedDate: Date) => {
    if (!accountId) return;
    
    setIsLoading(true);
    try {
      // Format date to match your database date format
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('account_id', accountId)
        .gte('created_at', `${formattedDate}T00:00:00`)
        .lte('created_at', `${formattedDate}T23:59:59`);

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
          description: "No campaign data found for the selected date.",
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
  }, [toast]);

  useEffect(() => {
    if (selectedAccountId && date) {
      fetchCampaignData(selectedAccountId, date);
    }
  }, [selectedAccountId, date, fetchCampaignData]);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />
        
        <div className="flex-1 overflow-auto">
          <ReportHeader
            title="Campaign Performance"
            description="Track and analyze your campaign metrics"
            date={date}
            setDate={setDate}
            onAccountChange={setSelectedAccountId}
          />

          <main className="p-8 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <PerformanceChart 
                useSampleData={!selectedAccountId} 
              />
              <CampaignTable 
                useSampleData={!selectedAccountId} 
                onCampaignsChange={setCampaigns}
                isLoading={isLoading}
              />
            </div>
          </main>
        </div>

        <div className="w-[400px] border-l border-gray-200 p-6 overflow-y-auto">
          <AiInsights campaigns={campaigns} />
        </div>
      </div>
    </SidebarProvider>
  );
}