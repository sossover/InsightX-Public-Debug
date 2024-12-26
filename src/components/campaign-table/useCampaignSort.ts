import { useState } from "react";
import { Campaign } from "./types";

export function useCampaignSort(campaigns: Campaign[]) {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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

  return {
    sortedCampaigns,
    handleSort,
    sortColumn,
    sortDirection
  };
}