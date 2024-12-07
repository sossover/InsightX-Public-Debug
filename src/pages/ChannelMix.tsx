import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { AiInsights } from "@/components/AiInsights";
import { MetricCard } from "@/components/MetricCard";
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon, BarChart as BarChartIcon } from "lucide-react";
import { DeviceAnalysis } from "@/components/DeviceAnalysis";

const channelData = [
  { name: "Paid Search", value: 45, color: "#4285F4", trend: 5.2 },
  { name: "Organic", value: 25, color: "#34A853", trend: 3.1 },
  { name: "Social", value: 15, color: "#EA4335", trend: -2.3 },
  { name: "Display", value: 10, color: "#FBBC05", trend: 1.5 },
  { name: "Email", value: 5, color: "#9b87f5", trend: -0.8 },
];

const performanceData = channelData.map(channel => ({
  name: channel.name,
  conversions: Math.floor(Math.random() * 1000),
  ctr: (Math.random() * 5).toFixed(2),
  cpa: Math.floor(Math.random() * 200),
  color: channel.color,
}));

export default function ChannelMix() {
  const [data] = useState(channelData);

  const campaignData: Campaign[] = data.map(item => ({
    name: item.name,
    spend: item.value * 100,
    impressions: item.value * 1000,
    clicks: Math.floor(item.value * 50),
    conversions: Math.floor(item.value * 2),
    get ctr() {
      return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
    },
    get cpa() {
      return this.conversions > 0 ? this.spend / this.conversions : 0;
    }
  }));

  const totalSpend = campaignData.reduce((acc, curr) => acc + curr.spend, 0);
  const totalConversions = campaignData.reduce((acc, curr) => acc + curr.conversions, 0);
  const averageCPA = totalSpend / totalConversions;
  const overallTrend = data.reduce((acc, curr) => acc + curr.trend, 0) / data.length;

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />
        
        <div className="flex-1 overflow-auto">
          <main className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Channel Mix Analysis</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Overall Trend:</span>
                {overallTrend >= 0 ? (
                  <div className="flex items-center text-google-green">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{overallTrend.toFixed(1)}%
                  </div>
                ) : (
                  <div className="flex items-center text-google-red">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    {overallTrend.toFixed(1)}%
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Marketing Spend"
                value={`$${totalSpend.toLocaleString()}`}
                trend={5.2}
              />
              <MetricCard
                title="Total Conversions"
                value={totalConversions}
                trend={3.8}
              />
              <MetricCard
                title="Average CPA"
                value={`$${averageCPA.toFixed(2)}`}
                trend={-2.1}
              />
              <MetricCard
                title="Active Channels"
                value={channelData.length}
                description="Across all marketing activities"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    <div className="flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5 text-google-blue" />
                      Channel Distribution
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={channelData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {channelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium">
                    <div className="flex items-center gap-2">
                      <BarChartIcon className="w-5 h-5 text-google-blue" />
                      Channel Performance
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="conversions" fill="#4285F4" name="Conversions" />
                        <Bar dataKey="cpa" fill="#34A853" name="CPA ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <DeviceAnalysis />

            <Card>
              <CardHeader>
                <CardTitle>Channel Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelData.map((channel) => (
                    <div
                      key={channel.name}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: channel.color }}
                        />
                        <span className="font-medium">{channel.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-gray-600">
                          Share: {channel.value}%
                        </span>
                        <div className={`flex items-center gap-1 text-sm ${
                          channel.trend >= 0 ? 'text-google-green' : 'text-google-red'
                        }`}>
                          {channel.trend >= 0 ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          <span>{Math.abs(channel.trend)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>

        <div className="w-[400px] border-l border-gray-200 p-6 overflow-y-auto">
          <AiInsights campaigns={campaignData} />
        </div>

        <ChatPanel campaignData={campaignData} />
      </div>
    </SidebarProvider>
  );
}
