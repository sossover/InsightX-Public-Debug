import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { SettingsTabs } from "@/components/settings/SettingsTabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const { toast } = useToast();

  const handleSettingsSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        <NavigationSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-google-blue mb-2">Settings</h1>
                  <p className="text-gray-500">Manage your account and preferences</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <Tabs value={activeTab} className="w-full">
                    <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    <TabsContent value="account" className="p-6">
                      <SettingsForm onSave={handleSettingsSave} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}