import { useState, useCallback, useEffect } from "react";
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
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchCampaignData = useCallback(async () => {
    if (useSampleData) {
      setError(null);
      return;
    }

    if (!selectedAccountId) {
      console.log('No account selected, skipping fetch');
      setError(null);
      setCampaigns([]);
      return;
    }
    
    setIsFetching(true);
    setError(null);
    
    try {
      console.log('Fetching campaign data for account:', selectedAccountId);
      
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

      const { data: campaignData, error: supabaseError } = await query;

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message);
      }

      console.log('Raw campaign data:', campaignData);

      if (!campaignData || campaignData.length === 0) {
        console.log('No campaign data found');
        setCampaigns([]);
        return;
      }

      const formattedCampaigns: Campaign[] = campaignData.map(campaign => ({
        name: campaign.name,
        spend: parseFloat(campaign.spend),
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

      console.log('Formatted campaigns:', formattedCampaigns);
      setCampaigns(formattedCampaigns);
    } catch (err) {
      console.error('Error fetching campaign data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch campaign data'));
      toast({
        title: "Error",
        description: "Failed to fetch campaign data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  }, [selectedAccountId, dateRange, useSampleData, toast]);

  // Initial data fetch
  useEffect(() => {
    if (selectedAccountId) {
      fetchCampaignData();
    }
  }, [selectedAccountId, dateRange, fetchCampaignData]);

  // Real-time subscription
  useEffect(() => {
    if (!selectedAccountId || useSampleData) return;

    console.log('Setting up real-time subscription for account:', selectedAccountId);
    
    const channel = supabase
      .channel('campaign-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'campaigns',
          filter: `account_id=eq.${selectedAccountId}`,
        },
        (payload) => {
          console.log('Received real-time update:', payload);
          fetchCampaignData();
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
      });

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [selectedAccountId, useSampleData, fetchCampaignData]);

  return {
    campaigns,
    isFetching,
    error,
    fetchCampaignData
  };
}