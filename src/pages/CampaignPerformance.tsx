import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { useState, useEffect } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { CampaignTable } from "@/components/CampaignTable";
import { PerformanceChart } from "@/components/PerformanceChart";
import { AiInsights } from "@/components/AiInsights";
import { ReportHeader } from "@/components/ReportHeader";
import { supabase } from "@/integrations/supabase/client";

export default function CampaignPerformance() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedAccountId) {
      fetchCampaignData();
    }
  }, [selectedAccountId]);

  const fetchCampaignData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('account_id', selectedAccountId);

      if (error) {
        console.error('Error fetching campaigns:', error);
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
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <PerformanceChart useSampleData={!selectedAccountId} />
              <CampaignTable 
                useSampleData={!selectedAccountId} 
                onCampaignsChange={setCampaigns}
              />
            </div>
          </main>
        </div>

        <div className="w-[400px] border-l border-gray-200 p-6 overflow-y-auto">
          <AiInsights campaigns={campaigns} />
        </div>

        <ChatPanel campaignData={campaigns} />
      </div>
    </SidebarProvider>
  );
}