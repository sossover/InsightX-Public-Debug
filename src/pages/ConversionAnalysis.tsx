import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";

const conversionData = [
  { date: "Jan", conversions: 120, rate: 2.5 },
  { date: "Feb", conversions: 150, rate: 2.8 },
  { date: "Mar", conversions: 180, rate: 3.2 },
  { date: "Apr", conversions: 160, rate: 2.9 },
  { date: "May", conversions: 200, rate: 3.5 },
  { date: "Jun", conversions: 220, rate: 3.8 },
];

export default function ConversionAnalysis() {
  const [data] = useState(conversionData);

  // Transform conversion data to match Campaign type
  const campaignData: Campaign[] = data.map(item => ({
    name: item.date,
    spend: item.conversions * 50, // Estimated spend based on conversions
    impressions: Math.floor(item.conversions * (100 / item.rate)), // Calculate impressions from conversion rate
    clicks: Math.floor(item.conversions * 5), // Estimated clicks
    conversions: item.conversions,
    get ctr() {
      return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
    },
    get cpa() {
      return this.conversions > 0 ? this.spend / this.conversions : 0;
    }
  }));

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />
        
        <div className="flex-1 overflow-auto">
          <main className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Conversion Analysis</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={conversionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="conversions"
                          stroke="#4285F4"
                          name="Conversions"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="rate"
                          stroke="#34A853"
                          name="Conversion Rate"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "Organic Search", conversions: 120, rate: "2.5%" },
                      { source: "Paid Search", conversions: 85, rate: "3.2%" },
                      { source: "Social", conversions: 45, rate: "1.8%" },
                      { source: "Email", conversions: 35, rate: "4.1%" },
                    ].map((source) => (
                      <div
                        key={source.source}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{source.source}</span>
                        <div className="flex gap-4">
                          <span className="text-google-blue">{source.conversions}</span>
                          <span className="text-google-green">{source.rate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        <ChatPanel campaignData={campaignData} />
      </div>
    </SidebarProvider>
  );
}