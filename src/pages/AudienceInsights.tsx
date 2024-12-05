import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";

const audienceData = [
  { age: "18-24", users: 1200, engagement: 3.2 },
  { age: "25-34", users: 2800, engagement: 4.5 },
  { age: "35-44", users: 2200, engagement: 3.8 },
  { age: "45-54", users: 1600, engagement: 3.1 },
  { age: "55-64", users: 900, engagement: 2.7 },
  { age: "65+", users: 500, engagement: 2.3 },
];

export default function AudienceInsights() {
  const [data] = useState(audienceData);

  // Transform audience data to match Campaign type
  const campaignData: Campaign[] = data.map(item => ({
    name: `Age ${item.age}`,
    spend: item.users * item.engagement, // Estimated spend based on users and engagement
    impressions: item.users * 10, // Estimated impressions
    clicks: Math.floor(item.users * (item.engagement / 10)), // Estimated clicks
    conversions: Math.floor(item.users * (item.engagement / 100)), // Estimated conversions
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
            <h1 className="text-2xl font-bold text-gray-900">Audience Insights</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Age Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={audienceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#4285F4" name="Users" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement by Age Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {audienceData.map((group) => (
                      <div
                        key={group.age}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{group.age}</span>
                        <div className="flex gap-4">
                          <span className="text-google-blue">{group.users.toLocaleString()} users</span>
                          <span className="text-google-green">{group.engagement} engagement</span>
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