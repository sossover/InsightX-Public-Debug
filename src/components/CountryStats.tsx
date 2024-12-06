import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin } from "lucide-react";

const countryData = [
  { country: "Brazil", spend: 108.79, impressions: 1322, clicks: 56, conversions: 7 },
  { country: "Spain", spend: 66.3, impressions: 3840, clicks: 46, conversions: 0 },
  { country: "United Kingdom", spend: 60.72, impressions: 1250, clicks: 22, conversions: 0 },
  { country: "Poland", spend: 48.43, impressions: 2052, clicks: 32, conversions: 0 },
  { country: "France", spend: 40.1, impressions: 3125, clicks: 28, conversions: 1 },
  { country: "United States", spend: 32.73, impressions: 1696, clicks: 11, conversions: 0 },
  { country: "Italy", spend: 32.39, impressions: 1567, clicks: 17, conversions: 3 },
  { country: "Japan", spend: 30.79, impressions: 146, clicks: 11, conversions: 0 },
  { country: "Colombia", spend: 30.64, impressions: 154, clicks: 15, conversions: 1 }
];

export function CountryStats() {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-google-green" />
          <span>Country Performance</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Target Country</TableHead>
                <TableHead className="text-right">Spend</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countryData.map((row) => (
                <TableRow key={row.country} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{row.country}</TableCell>
                  <TableCell className="text-right">${row.spend.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{row.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row.clicks}</TableCell>
                  <TableCell className="text-right">{row.conversions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}