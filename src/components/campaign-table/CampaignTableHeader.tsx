import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CampaignTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead className="font-semibold">Campaign</TableHead>
        <TableHead className="text-right font-semibold">Spend</TableHead>
        <TableHead className="text-right font-semibold">Impressions</TableHead>
        <TableHead className="text-right font-semibold">Clicks</TableHead>
        <TableHead className="text-right font-semibold">CTR</TableHead>
        <TableHead className="text-right font-semibold">Conversions</TableHead>
        <TableHead className="text-right font-semibold">CPA</TableHead>
      </TableRow>
    </TableHeader>
  );
}