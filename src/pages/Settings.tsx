import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SettingsForm } from "@/components/settings/SettingsForm";
import { SettingsTabs } from "@/components/settings/SettingsTabs";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const { toast } = useToast();

  const handleSettingsSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <NavigationSidebar />
      <div className="flex-1 overflow-auto">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          </div>
          <div className="hidden space-y-4 md:block">
            <div className="grid gap-4">
              <div className="grid gap-6">
                <div className="bg-white/60 backdrop-blur-xl shadow-sm border rounded-lg">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <SettingsTabs 
                      activeTab={activeTab} 
                      onTabChange={setActiveTab}
                    />
                    <TabsContent value="account" className="p-6">
                      <SettingsForm onSave={handleSettingsSave} />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}