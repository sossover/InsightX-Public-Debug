import { SidebarProvider } from "@/components/ui/sidebar";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Footer } from "@/components/Footer";
import { PricingModal } from "@/components/PricingModal";
import { HelpDialog } from "@/components/HelpDialog";
import { OnboardingTour } from "@/components/OnboardingTour";
import { useState, useMemo } from "react";
import { Campaign } from "@/components/campaign-table/types";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [useSampleData, setUseSampleData] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTopPanelOpen, setIsTopPanelOpen] = useState(false);

  const metrics = useMemo(() => {
    const totals = campaigns.reduce(
      (acc, campaign) => ({
        spend: acc.spend + campaign.spend,
        impressions: acc.impressions + campaign.impressions,
        clicks: acc.clicks + campaign.clicks,
        conversions: acc.conversions + campaign.conversions,
      }),
      { spend: 0, impressions: 0, clicks: 0, conversions: 0 }
    );

    return totals;
  }, [campaigns]);

  const handleSampleDataToggle = () => {
    setUseSampleData(!useSampleData);
  };

  const handleCampaignsChange = (newCampaigns: Campaign[]) => {
    setCampaigns(newCampaigns);
  };

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader
            date={date}
            setDate={setDate}
            isTopPanelOpen={isTopPanelOpen}
            setIsTopPanelOpen={setIsTopPanelOpen}
            setIsPricingOpen={setIsPricingOpen}
            setIsHelpOpen={setIsHelpOpen}
          />

          <main className="flex-1 flex flex-col pt-24">
            <DashboardContent
              useSampleData={useSampleData}
              handleSampleDataToggle={handleSampleDataToggle}
              campaigns={campaigns}
              metrics={metrics}
              onCampaignsChange={handleCampaignsChange}
            />
          </main>

          <Footer />
        </div>

        <PricingModal 
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
        />

        <HelpDialog
          open={isHelpOpen}
          onOpenChange={setIsHelpOpen}
        />

        <div className="chat-panel">
          <ChatPanel campaignData={campaigns} />
        </div>

        <OnboardingTour />
      </div>
    </SidebarProvider>
  );
};

export default Index;