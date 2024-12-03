import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const campaigns = [
  {
    name: "Performance Max - Competitor KW",
    spend: 4614.52,
    impressions: 780417,
    clicks: 15769,
    ctr: "2.02%",
    conversions: 250,
    cpa: 18.44,
  },
  {
    name: "Performance Max - In-Market",
    spend: 3962.88,
    impressions: 70570,
    clicks: 771,
    ctr: "1.09%",
    conversions: 3,
    cpa: 1062.01,
  },
  {
    name: "Search - Brand Terms",
    spend: 2845.65,
    impressions: 125890,
    clicks: 8965,
    ctr: "7.12%",
    conversions: 425,
    cpa: 6.70,
  },
  {
    name: "Display - Remarketing",
    spend: 1578.92,
    impressions: 458962,
    clicks: 3256,
    ctr: "0.71%",
    conversions: 85,
    cpa: 18.58,
  },
];

export function CampaignTable() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
      <Table>
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
        <TableBody>
          {campaigns.map((campaign) => (
            <TableRow key={campaign.name} className="hover:bg-gray-50">
              <TableCell className="font-medium">{campaign.name}</TableCell>
              <TableCell className="text-right">${campaign.spend.toFixed(2)}</TableCell>
              <TableCell className="text-right">{campaign.impressions.toLocaleString()}</TableCell>
              <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
              <TableCell className="text-right">{campaign.ctr}</TableCell>
              <TableCell className="text-right">{campaign.conversions}</TableCell>
              <TableCell className="text-right">${campaign.cpa.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}