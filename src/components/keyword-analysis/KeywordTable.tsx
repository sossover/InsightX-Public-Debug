import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Campaign } from "@/components/campaign-table/types";

interface KeywordTableProps {
  data: Campaign[];
}

export function KeywordTable({ data }: KeywordTableProps) {
  const getColorForCTR = (ctr: string) => {
    const ctrValue = parseFloat(ctr);
    if (ctrValue >= 8) return "text-google-green font-medium";
    if (ctrValue >= 5) return "text-google-blue font-medium";
    if (ctrValue >= 2) return "text-google-yellow font-medium";
    return "text-google-red font-medium";
  };

  const getColorForCPA = (cpa: number) => {
    if (cpa === 0) return "text-gray-400";
    if (cpa <= 10) return "text-google-green font-medium";
    if (cpa <= 50) return "text-google-blue font-medium";
    if (cpa <= 100) return "text-google-yellow font-medium";
    return "text-google-red font-medium";
  };

  const getColorForConversions = (conversions: number) => {
    if (conversions >= 2) return "text-google-green font-medium";
    if (conversions === 1) return "text-google-yellow font-medium";
    return "text-google-red font-medium";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-google-gray mb-6">Keyword Performance</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Cost per Conversion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell className="text-right">${row.spend.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{row.impressions}</TableCell>
                  <TableCell className="text-right">{row.clicks}</TableCell>
                  <TableCell className={`text-right ${getColorForCTR(row.ctr)}`}>{row.ctr}</TableCell>
                  <TableCell className={`text-right ${getColorForConversions(row.conversions)}`}>
                    {row.conversions}
                  </TableCell>
                  <TableCell className={`text-right ${getColorForCPA(row.cpa)}`}>
                    {row.cpa > 0 ? `$${row.cpa.toFixed(2)}` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}