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
    isSyncing,
    syncCampaignData,
    fetchCampaignData
  } = useCampaignData(selectedAccountId, dateRange, useSampleData);

  const sampleData = generateSampleData();
  const campaigns = useSampleData ? sampleData : realCampaigns;
  const { sortedCampaigns, handleSort } = useCampaignSort(campaigns);
  const totals = calculateTotals(campaigns);

  useEffect(() => {
    if (selectedAccountId && dateRange?.from && dateRange?.to) {
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

  return (
    <div className="space-y-4">
      {!useSampleData && (
        <TableActions
          useSampleData={useSampleData}
          onExport={() => exportToCSV(sortedCampaigns, totals)}
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