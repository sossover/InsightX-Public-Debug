import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { useEffect } from "react";
import { CampaignTableHeader } from "./campaign-table/CampaignTableHeader";
import { CampaignTableRow } from "./campaign-table/CampaignTableRow";
import { CampaignTableProps } from "./campaign-table/types";
import { generateSampleData } from "./campaign-table/data";
import { Loader2 } from "lucide-react";
import { TableActions } from "./campaign-table/TableActions";
import { useCampaignData } from "./campaign-table/useCampaignData";
import { useCampaignSort } from "./campaign-table/useCampaignSort";
import { calculateTotals } from "./campaign-table/CampaignTableTotals";
import { exportToCSV } from "./campaign-table/CampaignExport";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function CampaignTable({ 
  useSampleData = false, 
  onCampaignsChange, 
  isLoading = false,
  dateRange,
  selectedAccountId 
}: CampaignTableProps) {
  const {
    campaigns: realCampaigns,
    isFetching,
    error,
    fetchCampaignData
  } = useCampaignData(selectedAccountId, dateRange, useSampleData);

  const sampleData = generateSampleData();
  const campaigns = useSampleData ? sampleData : realCampaigns;
  const { sortedCampaigns, handleSort } = useCampaignSort(campaigns);
  const totals = calculateTotals(campaigns);

  useEffect(() => {
    if (selectedAccountId) {
      console.log('Fetching campaign data for account:', selectedAccountId);
      fetchCampaignData();
    }
  }, [selectedAccountId, dateRange, fetchCampaignData]);

  useEffect(() => {
    onCampaignsChange?.(campaigns);
  }, [campaigns, onCampaignsChange]);

  if (isLoading || isFetching) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load campaign data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!selectedAccountId && !useSampleData) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select an account to view campaign data.
        </AlertDescription>
      </Alert>
    );
  }

  if (campaigns.length === 0) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No campaign data available for the selected period.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {!useSampleData && (
        <TableActions
          useSampleData={useSampleData}
          onExport={() => exportToCSV(sortedCampaigns, totals)}
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