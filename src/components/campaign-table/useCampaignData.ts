import { useState, useCallback } from "react";
import { Campaign } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export function useCampaignData(
  selectedAccountId: string | undefined,
  dateRange: DateRange | undefined,
  useSampleData: boolean
) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const fetchCampaignData = useCallback(async () => {
    if (useSampleData || !selectedAccountId) return;
    
    setIsFetching(true);
    try {
      let query = supabase
        .from('campaigns')
        .select('*')
        .eq('account_id', selectedAccountId);

      if (dateRange?.from && dateRange?.to) {
        const fromDate = format(dateRange.from, 'yyyy-MM-dd');
        const toDate = format(dateRange.to, 'yyyy-MM-dd');
        query = query
          .gte('created_at', fromDate)
          .lte('created_at', toDate);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching campaigns:', error);
        toast({
          title: "Error",
          description: "Failed to fetch campaign data",
          variant: "destructive",
        });
        return;
      }

      const formattedCampaigns: Campaign[] = data?.map(campaign => ({
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
      })) || [];

      setCampaigns(formattedCampaigns);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  }, [selectedAccountId, dateRange, useSampleData, toast]);

  const syncCampaignData = async () => {
    if (!selectedAccountId) {
      toast({
        title: "Error",
        description: "Please select an account before syncing",
        variant: "destructive",
      });
      return;
    }

    setIsSyncing(true);
    try {
      const fromDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
      const toDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

      console.log('Syncing with dates:', { fromDate, toDate });

      const { data, error } = await supabase.functions.invoke('sync-facebook-campaigns', {
        body: {
          accountId: selectedAccountId,
          dateFrom: fromDate,
          dateTo: toDate
        }
      });

      if (error) throw error;

      console.log('Sync response:', data);

      toast({
        title: "Success",
        description: "Campaign data synced successfully",
      });

      await fetchCampaignData();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to sync campaign data",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return {
    campaigns,
    isFetching,
    isSyncing,
    fetchCampaignData,
    syncCampaignData
  };
}