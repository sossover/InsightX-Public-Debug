import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { MetricCard } from "@/components/MetricCard";
import { WebinarInvite } from "@/components/WebinarInvite";
import { ReferFriend } from "@/components/ReferFriend";
import { ConversionGoals } from "@/components/ConversionGoals";
import { ConversionSources } from "@/components/ConversionSources";
import { AiInsights } from "@/components/AiInsights";

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
    spend: item.conversions * 50,
    impressions: Math.floor(item.conversions * (100 / item.rate)),
    clicks: Math.floor(item.conversions * 5),
    conversions: item.conversions,
    get ctr() {
      return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
    },
    get cpa() {
      return this.conversions > 0 ? this.spend / this.conversions : 0;
    }
  }));

  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const averageRate = data.reduce((sum, item) => sum + item.rate, 0) / data.length;
  const monthlyGrowth = ((data[data.length - 1].conversions - data[data.length - 2].conversions) / data[data.length - 2].conversions) * 100;

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />
        
        <div className="flex-1 overflow-auto bg-gray-50">
          <main className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-custom-purple-500">Conversion Analysis</h1>
                <p className="text-gray-600 mt-2">Track and analyze your conversion metrics over time</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Total Conversions"
                value={totalConversions}
                trend={monthlyGrowth}
                description="Total conversions across all channels"
              />
              <MetricCard
                title="Average Conversion Rate"
                value={`${averageRate.toFixed(1)}%`}
                trend={12.5}
                description="Average conversion rate over the period"
              />
              <MetricCard
                title="Monthly Growth"
                value={`${monthlyGrowth.toFixed(1)}%`}
                trend={monthlyGrowth}
                description="Month-over-month conversion growth rate"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-2 bg-white shadow-lg border-none">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-custom-purple-500">
                    Conversion Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={conversionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#6E59A5"
                          tick={{ fill: '#6E59A5' }}
                        />
                        <YAxis 
                          yAxisId="left" 
                          stroke="#4285F4"
                          tick={{ fill: '#4285F4' }}
                        />
                        <YAxis 
                          yAxisId="right" 
                          orientation="right" 
                          stroke="#34A853"
                          tick={{ fill: '#34A853' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Legend />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="conversions"
                          stroke="#4285F4"
                          strokeWidth={2}
                          dot={{ fill: '#4285F4', strokeWidth: 2 }}
                          name="Conversions"
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="rate"
                          stroke="#34A853"
                          strokeWidth={2}
                          dot={{ fill: '#34A853', strokeWidth: 2 }}
                          name="Conversion Rate (%)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-2">
                <AiInsights 
                  campaigns={campaignData}
                  deviceData={[
                    { name: "DESKTOP", value: 65.5, color: "#4285F4" },
                    { name: "MOBILE", value: 28.3, color: "#34A853" },
                    { name: "TABLET", value: 6.2, color: "#EA4335" },
                  ]}
                  countryData={[
                    { country: "United States", spend: 1250.45, impressions: 25000, clicks: 1200, conversions: 85 },
                    { country: "United Kingdom", spend: 850.32, impressions: 18000, clicks: 850, conversions: 42 },
                    { country: "Germany", spend: 650.18, impressions: 15000, clicks: 720, conversions: 38 },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-6">
                <WebinarInvite />
                <ReferFriend />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <ConversionGoals />
              <ConversionSources />
            </div>
          </main>
        </div>

        <ChatPanel campaignData={campaignData} />
      </div>
    </SidebarProvider>
  );
}