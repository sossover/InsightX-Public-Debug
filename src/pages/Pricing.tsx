import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PricingModal } from "@/components/PricingModal";
import { useState } from "react";
import { ChatPanel } from "@/components/chat/ChatPanel";

export default function Pricing() {
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        <NavigationSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-2xl font-bold text-google-blue mb-6">Pricing</h1>
              <p className="text-gray-600 mb-4">Choose a plan that fits your needs.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold">Basic Plan</h2>
                  <p className="text-gray-500">$10/month</p>
                  <p className="mt-4">Basic features for small teams.</p>
                  <button
                    onClick={() => setIsPricingOpen(true)}
                    className="mt-4 w-full bg-custom-purple-300 text-white py-2 rounded-lg"
                  >
                    Select
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold">Pro Plan</h2>
                  <p className="text-gray-500">$30/month</p>
                  <p className="mt-4">Advanced features for growing teams.</p>
                  <button
                    onClick={() => setIsPricingOpen(true)}
                    className="mt-4 w-full bg-custom-purple-300 text-white py-2 rounded-lg"
                  >
                    Select
                  </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold">Enterprise Plan</h2>
                  <p className="text-gray-500">Contact us for pricing</p>
                  <p className="mt-4">Custom solutions for large organizations.</p>
                  <button
                    onClick={() => setIsPricingOpen(true)}
                    className="mt-4 w-full bg-custom-purple-300 text-white py-2 rounded-lg"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
        <ChatPanel campaignData={[]} />
      </div>
      <PricingModal 
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </SidebarProvider>
  );
}
