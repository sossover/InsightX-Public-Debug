import { useState } from "react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiInsights } from "@/components/AiInsights";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const keywordData = [
  { keyword: "supermetrics", spend: 62.31, impressions: 484, clicks: 9, ctr: "1.86%", conversions: 2, cpa: 31.15 },
  { keyword: "looker studio meta ads", spend: 43.66, impressions: 190, clicks: 13, ctr: "6.84%", conversions: 1, cpa: 1062.01 },
  { keyword: "salesforce bigquery", spend: 33.55, impressions: 141, clicks: 9, ctr: "6.38%", conversions: 0, cpa: 0 },
  { keyword: "meta looker studio", spend: 22.05, impressions: 149, clicks: 9, ctr: "6.04%", conversions: 0, cpa: 0 },
  { keyword: "powerbi google ads", spend: 18.45, impressions: 61, clicks: 6, ctr: "9.84%", conversions: 2, cpa: 9.23 },
];

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

const KeywordAnalysis = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Fixed Navigation */}
          <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <h1 className="text-2xl font-bold text-google-blue">Keyword Analysis</h1>
                  <div className="flex items-center gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Campaign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campaigns</SelectItem>
                    <SelectItem value="search">Search Campaign</SelectItem>
                    <SelectItem value="display">Display Campaign</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Target Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Keyword" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Keywords</SelectItem>
                    <SelectItem value="brand">Brand Keywords</SelectItem>
                    <SelectItem value="non-brand">Non-Brand Keywords</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Search keywords..." className="h-10" />
              </div>

              {/* Keyword Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-google-gray mb-6">Keyword Performance</h2>
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
                      {keywordData.map((row) => (
                        <TableRow key={row.keyword}>
                          <TableCell className="font-medium">{row.keyword}</TableCell>
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

              {/* AI Insights */}
              <AiInsights />
            </div>
          </main>
        </div>

        <MetricsSidebar />
      </div>
    </SidebarProvider>
  );
};

export default KeywordAnalysis;