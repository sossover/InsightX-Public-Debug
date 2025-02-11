import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { useState, useEffect, useCallback } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { CampaignTable } from "@/components/CampaignTable";
import { PerformanceChart } from "@/components/PerformanceChart";
import { AiInsights } from "@/components/AiInsights";
import { ReportHeader } from "@/components/ReportHeader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { DateRange } from "react-day-picker";
import { SimpleCampaignTable } from "@/components/campaign-table/SimpleCampaignTable";
import { format } from "date-fns";

export default function CampaignPerformance() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const handleSync = async () => {
    if (!selectedAccountId || !dateRange?.from || !dateRange?.to) {
      toast({
        title: "Error",
        description: "Please select an account and date range before syncing",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    try {
      console.log('Starting sync with account ID:', selectedAccountId);
      
      const response = await supabase.functions.invoke('fetch-google-sheets', {
        headers: { 'x-account-id': selectedAccountId }
      });

      console.log('Sync response:', response);

      if (!response.data?.success) {
        throw new Error(response.data?.error || 'Failed to sync data');
      }

      toast({
        title: "Success",
        description: `Successfully synced ${response.data.rowCount} campaigns from Google Sheets`,
      });

      // Refresh the campaign data after successful sync
      await fetchCampaignData();
    } catch (error) {
      console.error('Error syncing campaigns:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sync campaign data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const fetchCampaignData = useCallback(async () => {
    if (!selectedAccountId || !dateRange?.from || !dateRange?.to) return;
    
    setIsLoading(true);
    try {
      const fromDate = format(dateRange.from, 'yyyy-MM-dd');
      const toDate = format(dateRange.to, 'yyyy-MM-dd');
      
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
  }, [selectedAccountId, dateRange, toast]);

  useEffect(() => {
    if (selectedAccountId && dateRange?.from && dateRange?.to) {
      fetchCampaignData();
    }
  }, [selectedAccountId, dateRange, fetchCampaignData]);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />
        
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-between p-8 pb-0">
            <ReportHeader
              title="Campaign Performance"
              description="Track and analyze your campaign metrics"
              date={dateRange}
              setDate={setDateRange}
              onAccountChange={setSelectedAccountId}
            />
            
            <Button
              onClick={handleSync}
              disabled={!selectedAccountId || isSyncing || !dateRange?.from || !dateRange?.to}
              className="ml-4 bg-violet-500 hover:bg-violet-600 text-white"
            >
              {isSyncing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              {isSyncing ? "Syncing..." : "Sync Data"}
            </Button>
          </div>

          <main className="p-8 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <PerformanceChart 
                useSampleData={!selectedAccountId} 
              />
              <SimpleCampaignTable 
                campaigns={campaigns}
                dateRange={dateRange}
              />
              <CampaignTable 
                useSampleData={!selectedAccountId} 
                onCampaignsChange={setCampaigns}
                isLoading={isLoading}
                dateRange={dateRange}
                selectedAccountId={selectedAccountId}
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