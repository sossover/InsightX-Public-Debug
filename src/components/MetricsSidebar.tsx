import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

export function MetricsSidebar() {
  return (
    <Sidebar side="right">
      <SidebarContent className="h-screen flex flex-col justify-center">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Metrics & Dimensions
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data Source</label>
              <Select defaultValue="google_ads">
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google_ads">Google Ads</SelectItem>
                  <SelectItem value="analytics">Google Analytics</SelectItem>
                  <SelectItem value="search_console">Search Console</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Metric</label>
              <Select defaultValue="conversions">
                <SelectTrigger>
                  <SelectValue placeholder="Select primary metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conversions">Conversions</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="roas">ROAS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Dimension</label>
              <Select defaultValue="campaign">
                <SelectTrigger>
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="ad_group">Ad Group</SelectItem>
                  <SelectItem value="keyword">Keyword</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Black Friday Banner */}
        <div className="mt-6 p-4 bg-gradient-to-r from-custom-purple-300 to-custom-purple-500 text-white rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">🎉 Black Friday Sale!</h3>
          <p className="text-sm mb-3">Get 60% off all plans for a limited time only.</p>
          <button className="w-full bg-white text-custom-purple-500 py-2 px-4 rounded-md font-semibold hover:bg-opacity-90 transition-colors">
            Claim Offer
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}