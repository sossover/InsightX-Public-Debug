import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { AiInsights } from "@/components/AiInsights";
import { AudienceMetrics } from "@/components/audience/AudienceMetrics";
import { AgeDistribution } from "@/components/audience/AgeDistribution";
import { EngagementTrends } from "@/components/audience/EngagementTrends";
import { EngagementByAge } from "@/components/audience/EngagementByAge";
import { ReportHeader } from "@/components/ReportHeader";
import { DateRange } from "react-day-picker";

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
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

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
          <ReportHeader
            title="Audience Insights"
            description="Understand your audience demographics and behavior"
            date={date}
            setDate={setDate}
            onAccountChange={setSelectedAccountId}
          />

          <main className="p-8 space-y-8">
            <AudienceMetrics
              totalUsers={totalUsers}
              avgEngagement={avgEngagement}
              totalGrowth={totalGrowth}
            />

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <AgeDistribution data={data} />
                  <EngagementTrends data={engagementTrends} />
                </div>
                <EngagementByAge data={data} />
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-8">
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
            </div>
          </main>
        </div>

        <ChatPanel campaignData={campaignData} />
      </div>
    </SidebarProvider>
  );
}