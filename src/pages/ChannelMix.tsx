import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { useState } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { AiInsights } from "@/components/AiInsights";
import { DeviceAnalysis } from "@/components/DeviceAnalysis";
import { ReportHeader } from "@/components/ReportHeader";
import { ChannelMetrics } from "@/components/channel-mix/ChannelMetrics";
import { ChannelDistribution } from "@/components/channel-mix/ChannelDistribution";
import { ChannelPerformance } from "@/components/channel-mix/ChannelPerformance";

const channelData = [
  { name: "Search", value: 42.5, color: "#4285F4", trend: 8.3 },
  { name: "Display", value: 28.7, color: "#34A853", trend: 3.2 },
  { name: "Shopping", value: 15.8, color: "#EA4335", trend: 12.5 },
  { name: "Video", value: 8.4, color: "#FBBC05", trend: 15.7 },
  { name: "Discovery", value: 4.6, color: "#9b87f5", trend: -2.1 },
];

const performanceData = channelData.map(channel => ({
  name: channel.name,
  conversions: Math.floor(Math.random() * 800 + 200),
  ctr: (Math.random() * 3 + 1).toFixed(2),
  cpa: Math.floor(Math.random() * 150 + 50),
  color: channel.color,
}));

export default function ChannelMix() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  const campaignData: Campaign[] = channelData.map(item => ({
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
  const overallTrend = channelData.reduce((acc, curr) => acc + curr.trend, 0) / channelData.length;

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar />
        
        <div className="flex-1 overflow-auto">
          <ReportHeader
            title="Channel Mix Analysis"
            description="Analyze performance across different marketing channels"
            date={date}
            setDate={setDate}
            onAccountChange={setSelectedAccountId}
          />

          <main className="p-8 space-y-8">
            <ChannelMetrics
              totalSpend={totalSpend}
              totalConversions={totalConversions}
              averageCPA={averageCPA}
              channelCount={channelData.length}
              overallTrend={overallTrend}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChannelDistribution data={channelData} />
              <ChannelPerformance data={performanceData} />
            </div>

            <DeviceAnalysis />
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