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
                  <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
                  <Tabs value={activeTab} className="w-full">
                    <TabsContent value="account" className="p-6">
                      <SettingsForm onSave={handleSettingsSave} />
                    </TabsContent>
                    <TabsContent value="notifications" className="p-6">
                      <NotificationSettings onSave={handleSettingsSave} />
                    </TabsContent>
                    <TabsContent value="appearance" className="p-6">
                      <AppearanceSettings onSave={handleSettingsSave} />
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

function NotificationSettings({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-gray-500">Choose how you want to be notified</p>
      </div>
      <div className="space-y-4">
        <NotificationToggle 
          title="Email Notifications" 
          description="Receive email updates about your account activity"
        />
        <NotificationToggle 
          title="Push Notifications" 
          description="Get instant updates in your browser"
        />
        <NotificationToggle 
          title="Weekly Digest" 
          description="Receive a weekly summary of your analytics"
        />
      </div>
      <SaveButton onSave={onSave} />
    </div>
  );
}

function AppearanceSettings({ onSave }: { onSave: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <p className="text-sm text-gray-500">Customize how InsightX looks on your device</p>
      </div>
      <div className="space-y-4">
        <ThemeSelector />
        <FontSizeSelector />
      </div>
      <SaveButton onSave={onSave} />
    </div>
  );
}

function NotificationToggle({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-sm font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch />
    </div>
  );
}

function ThemeSelector() {
  return (
    <div className="space-y-2">
      <Label>Theme</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function FontSizeSelector() {
  return (
    <div className="space-y-2">
      <Label>Font Size</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="small">Small</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="large">Large</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

function SaveButton({ onSave }: { onSave: () => void }) {
  return (
    <Button 
      onClick={onSave}
      className="w-full sm:w-auto bg-custom-purple-300 hover:bg-custom-purple-400 text-white"
    >
      Save Changes
    </Button>
  );
}