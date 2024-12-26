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

export function CampaignTable({ useSampleData = false, onCampaignsChange, isLoading = false }: CampaignTableProps) {
  const [sampleData, setSampleData] = useState(generateSampleData());
  const [realCampaigns, setRealCampaigns] = useState<Campaign[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();

  const fetchCampaignData = async () => {
    if (useSampleData) return;
    
    setIsFetching(true);
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching campaigns:', error);
        toast({
          title: "Error",
          description: "Failed to fetch campaign data",
          variant: "destructive",
        });
        return;
      }

      if (!data || data.length === 0) {
        console.log('No campaign data found');
        setRealCampaigns([]);
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

      console.log('Fetched campaigns:', formattedCampaigns);
      setRealCampaigns(formattedCampaigns);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching campaign data",
        variant: "destructive",
      });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchCampaignData();
  }, [useSampleData]);

  const campaigns = useSampleData ? sampleData : realCampaigns;

  useEffect(() => {
    if (useSampleData) {
      setSampleData(generateSampleData());
    }
    onCampaignsChange?.(campaigns);
  }, [useSampleData, campaigns, onCampaignsChange]);

  // Calculate totals
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

  if (isLoading || isFetching) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-x-auto">
      <Table>
        <CampaignTableHeader />
        <TableBody>
          {campaigns.map((campaign) => (
            <CampaignTableRow key={campaign.name} campaign={campaign} />
          ))}
          <CampaignTableRow campaign={totals} isTotal />
        </TableBody>
      </Table>
    </div>
  );
}