import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";

const channelData = [
  { name: "Paid Search", value: 45, color: "#4285F4" },
  { name: "Organic", value: 25, color: "#34A853" },
  { name: "Social", value: 15, color: "#EA4335" },
  { name: "Display", value: 10, color: "#FBBC05" },
  { name: "Email", value: 5, color: "#9b87f5" },
];

export default function ChannelMix() {
  const [data] = useState(channelData);

  // Transform channel data to match Campaign type
  const campaignData: Campaign[] = data.map(item => ({
    name: item.name,
    spend: item.value * 100, // Estimated spend based on percentage
    impressions: item.value * 1000, // Estimated impressions
    clicks: Math.floor(item.value * 50), // Estimated clicks
    conversions: Math.floor(item.value * 2), // Estimated conversions
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
            <h1 className="text-2xl font-bold text-gray-900">Channel Mix Analysis</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Distribution</CardTitle>
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
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channelData.map((channel) => (
                      <div
                        key={channel.name}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{channel.name}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: channel.color }}
                          />
                          <span>{channel.value}%</span>
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