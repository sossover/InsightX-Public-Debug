import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { CampaignTableHeader } from "./campaign-table/CampaignTableHeader";
import { CampaignTableRow } from "./campaign-table/CampaignTableRow";
import { Campaign, CampaignTableProps } from "./campaign-table/types";
import { defaultCampaigns, generateSampleData } from "./campaign-table/data";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { TableActions } from "./campaign-table/TableActions";

export function CampaignTable({ 
  useSampleData = false, 
  onCampaignsChange, 
  isLoading = false,
  dateRange,
  selectedAccountId 
}: CampaignTableProps) {
  const [sampleData, setSampleData] = useState(generateSampleData());
  const [realCampaigns, setRealCampaigns] = useState<Campaign[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const { toast } = useToast();

  const fetchCampaignData = async () => {
    if (useSampleData || !selectedAccountId || !dateRange?.from || !dateRange?.to) return;
    
    setIsFetching(true);
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

      setRealCampaigns(formattedCampaigns);
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
  };

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

      console.log('Syncing with date range:', { fromDate, toDate });

      const { data, error } = await supabase.functions.invoke('sync-facebook-campaigns', {
        body: {
          accountId: selectedAccountId,
          dateFrom: fromDate,
          dateTo: toDate
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Campaign data synced successfully",
      });

      await fetchCampaignData();
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while syncing campaign data",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, [useSampleData, selectedAccountId, dateRange]);

  const campaigns = useSampleData ? sampleData : realCampaigns;

  useEffect(() => {
    if (useSampleData) {
      setSampleData(generateSampleData());
    }
    onCampaignsChange?.(campaigns);
  }, [useSampleData, campaigns, onCampaignsChange]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue = a[sortColumn as keyof Campaign];
    let bValue = b[sortColumn as keyof Campaign];

    if (sortColumn === 'ctr') {
      aValue = parseFloat(a.ctr.replace('%', ''));
      bValue = parseFloat(b.ctr.replace('%', ''));
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totals: Campaign = {
    name: "Total",
    spend: campaigns.reduce((sum, campaign) => sum + campaign.spend, 0),
    impressions: campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0),
    clicks: campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0),
    conversions: campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0),
    get ctr() {
      return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
    },
    get cpa() {
      return this.conversions > 0 ? this.spend / this.conversions : 0;
    },
  };

  const exportToCSV = () => {
    const headers = ['Campaign', 'Spend', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'CPA'];
    const data = sortedCampaigns.map(campaign => [
      campaign.name,
      campaign.spend.toFixed(2),
      campaign.impressions,
      campaign.clicks,
      campaign.ctr,
      campaign.conversions,
      campaign.cpa.toFixed(2)
    ]);
    data.push([
      totals.name,
      totals.spend.toFixed(2),
      totals.impressions,
      totals.clicks,
      totals.ctr,
      totals.conversions,
      totals.cpa.toFixed(2)
    ]);

    const csvContent = [headers, ...data]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'campaign_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading || isFetching) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!useSampleData && (
        <TableActions
          useSampleData={useSampleData}
          onExport={exportToCSV}
          onSync={syncCampaignData}
          isSyncing={isSyncing}
          dateRange={dateRange}
          selectedAccountId={selectedAccountId}
        />
      )}
      
      <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
        <Table>
          <CampaignTableHeader onSort={handleSort} />
          <TableBody>
            {sortedCampaigns.map((campaign) => (
              <CampaignTableRow key={campaign.name} campaign={campaign} />
            ))}
            <CampaignTableRow campaign={totals} isTotal />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}