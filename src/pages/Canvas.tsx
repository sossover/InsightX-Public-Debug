import { useState } from "react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReportHeader } from "@/components/ReportHeader";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { DateRange } from "react-day-picker";

const Canvas = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  const handleAccountChange = (accountId: string) => {
    setSelectedAccountId(accountId);
  };

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <ReportHeader 
            title="Canvas"
            description="Design and customize your marketing visuals"
            date={date}
            setDate={setDate}
            onAccountChange={handleAccountChange}
          />

          <main className="flex-1 flex flex-col">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Canvas Editor</h2>
                <p className="text-gray-600">Start creating your marketing visuals here.</p>
              </div>
            </div>
          </main>
        </div>

        <ChatPanel campaignData={[]} />
      </div>
    </SidebarProvider>
  );
};

export default Canvas;