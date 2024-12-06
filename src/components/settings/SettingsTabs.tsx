import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Palette } from "lucide-react";

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <TabsList className="w-full justify-start rounded-none border-b border-gray-200 px-4 py-2">
        <TabsTrigger
          value="account"
          onClick={() => onTabChange("account")}
          className={`flex items-center gap-2 px-4 py-2 ${
            activeTab === "account"
              ? "text-custom-purple-300 border-b-2 border-custom-purple-300"
              : "text-gray-500"
          }`}
        >
          <User className="w-4 h-4" />
          Account
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          onClick={() => onTabChange("notifications")}
          className={`flex items-center gap-2 px-4 py-2 ${
            activeTab === "notifications"
              ? "text-custom-purple-300 border-b-2 border-custom-purple-300"
              : "text-gray-500"
          }`}
        >
          <Bell className="w-4 h-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="appearance"
          onClick={() => onTabChange("appearance")}
          className={`flex items-center gap-2 px-4 py-2 ${
            activeTab === "appearance"
              ? "text-custom-purple-300 border-b-2 border-custom-purple-300"
              : "text-gray-500"
          }`}
        >
          <Palette className="w-4 h-4" />
          Appearance
        </TabsTrigger>
      </TabsList>
    </div>
  );
}