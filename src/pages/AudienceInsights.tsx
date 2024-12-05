import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { MetricCard } from "@/components/MetricCard";
import { AiInsights } from "@/components/AiInsights";
import { Users, Target, TrendingUp, UserCheck } from "lucide-react";

const audienceData = [
  { age: "18-24", users: 1200, engagement: 3.2, growth: 15 },
  { age: "25-34", users: 2800, engagement: 4.5, growth: 22 },
  { age: "35-44", users: 2200, engagement: 3.8, growth: 18 },
  { age: "45-54", users: 1600, engagement: 3.1, growth: 10 },
  { age: "55-64", users: 900, engagement: 2.7, growth: 5 },
  { age: "65+", users: 500, engagement: 2.3, growth: 3 },
];

const engagementTrends = [
  { month: "Jan", engagement: 2.8, users: 5200 },
  { month: "Feb", engagement: 3.1, users: 5800 },
  { month: "Mar", engagement: 3.5, users: 6400 },
  { month: "Apr", engagement: 3.8, users: 7100 },
  { month: "May", engagement: 4.2, users: 7800 },
  { month: "Jun", engagement: 4.5, users: 8200 },
];

export default function AudienceInsights() {
  const [data] = useState(audienceData);

  // Transform audience data to match Campaign type for AI Insights
  const campaignData: Campaign[] = data.map(item => ({
    name: `Age ${item.age}`,
    spend: item.users * item.engagement,
    impressions: item.users * 10,
    clicks: Math.floor(item.users * (item.engagement / 10)),
    conversions: Math.floor(item.users * (item.engagement / 100)),
    get ctr() {
      return ((this.clicks / this.impressions) * 100).toFixed(2) + "%";
    },
    get cpa() {
      return this.conversions > 0 ? this.spend / this.conversions : 0;
    }
  }));

  const totalUsers = data.reduce((sum, item) => sum + item.users, 0);
  const avgEngagement = data.reduce((sum, item) => sum + item.engagement, 0) / data.length;
  const totalGrowth = data.reduce((sum, item) => sum + item.growth, 0);

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />
        
        <div className="flex-1 overflow-auto bg-gray-50">
          <main className="p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-custom-purple-500">Audience Insights</h1>
                <p className="text-gray-600 mt-2">Understand your audience demographics and behavior</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Total Users"
                value={totalUsers.toLocaleString()}
                trend={15}
                description="Active users across all age groups"
              />
              <MetricCard
                title="Average Engagement"
                value={`${avgEngagement.toFixed(1)}%`}
                trend={8}
                description="Average engagement rate"
              />
              <MetricCard
                title="Monthly Growth"
                value={`${totalGrowth.toFixed(1)}%`}
                trend={totalGrowth}
                description="Combined growth across segments"
              />
              <MetricCard
                title="Active Segments"
                value="6"
                trend={0}
                description="Number of active age segments"
              />
            </div>

            <div className="flex flex-1 gap-6">
              <div className="flex-1 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white shadow-lg border-none">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-custom-purple-500 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Age Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={audienceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="age" 
                              stroke="#6E59A5"
                              tick={{ fill: '#6E59A5' }}
                            />
                            <YAxis 
                              stroke="#4285F4"
                              tick={{ fill: '#4285F4' }}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'white',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                              }}
                            />
                            <Bar dataKey="users" fill="#4285F4" name="Users" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-lg border-none">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-custom-purple-500 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Engagement Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={engagementTrends}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="month" 
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
                              dataKey="engagement" 
                              stroke="#4285F4" 
                              name="Engagement Rate"
                            />
                            <Line 
                              yAxisId="right"
                              type="monotone" 
                              dataKey="users" 
                              stroke="#34A853" 
                              name="Total Users"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white shadow-lg border-none">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-custom-purple-500 flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      Engagement by Age Group
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {audienceData.map((group) => (
                        <div
                          key={group.age}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="space-y-1">
                            <span className="font-medium text-gray-900">{group.age}</span>
                            <div className="text-sm text-gray-500">
                              {group.users.toLocaleString()} users
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-google-blue font-medium">
                              {group.engagement}% engagement
                            </div>
                            <div className="text-sm text-google-green">
                              +{group.growth}% growth
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="w-[400px] flex-shrink-0">
                <AiInsights 
                  campaigns={campaignData}
                  deviceData={[
                    { name: "Mobile", value: 45.5, color: "#4285F4" },
                    { name: "Desktop", value: 38.3, color: "#34A853" },
                    { name: "Tablet", value: 16.2, color: "#EA4335" },
                  ]}
                  countryData={[
                    { country: "United States", spend: 1250.45, impressions: 25000, clicks: 1200, conversions: 85 },
                    { country: "United Kingdom", spend: 850.32, impressions: 18000, clicks: 850, conversions: 42 },
                    { country: "Germany", spend: 650.18, impressions: 15000, clicks: 720, conversions: 38 },
                  ]}
                />
              </div>
            </div>
          </main>
        </div>

        <ChatPanel campaignData={campaignData} />
      </div>
    </SidebarProvider>
  );
}