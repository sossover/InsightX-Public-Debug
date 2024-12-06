import { Home, BarChart, Users, Settings, PieChart, TrendingUp, Globe, FileText, ListChecks, Sparkles, ArrowUpRight } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { ReferFriend } from "./ReferFriend";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { FileUploadDialog } from "./FileUploadDialog";
import { useToast } from "@/components/ui/use-toast";
import { PricingModal } from "./PricingModal";

const mainItems = [
  { title: "Overview", icon: Home, url: "/" },
  { title: "Campaign Performance", icon: TrendingUp, url: "/" },
  { title: "Geographic Analysis", icon: Globe, url: "/geo-report" },
  { title: "Keyword Analysis", icon: FileText, url: "/keyword-analysis" },
  { title: "Audience Insights", icon: Users, url: "/audience-insights" },
  { title: "Conversion Analysis", icon: BarChart, url: "/conversion-analysis" },
  { title: "Channel Mix", icon: PieChart, url: "/channel-mix" },
  { title: "Optimization List", icon: ListChecks, url: "/optimization-list" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const createItems = [
  { title: "Import", icon: FileText, url: "#", isImport: true },
];

export function NavigationSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleItemClick = (item: any) => {
    if (item.isImport) {
      setIsUploadDialogOpen(true);
    } else if (item.url.startsWith("/")) {
      navigate(item.url);
    }
  };

  return (
    <Sidebar className="border-r border-gray-200 group">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-3 py-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
                InsightX
              </h2>
              <Sparkles className="w-5 h-5 text-google-blue animate-pulse" />
            </div>
            <p className="text-sm text-gray-500">Marketing Analytics</p>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    onClick={() => item.url.startsWith("/") && navigate(item.url)}
                  >
                    <a className="flex items-center gap-2 transition-all duration-200 hover:text-google-blue hover:translate-x-1 group-hover:cursor-pointer relative before:content-[''] before:absolute before:-inset-1 before:rounded-lg before:bg-custom-purple-50 before:scale-x-0 before:opacity-0 hover:before:scale-x-100 hover:before:opacity-100 before:transition-all before:duration-300 before:origin-left">
                      <item.icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            {/* Visual separator */}
            <div className="my-6 px-3">
              <div className="h-px bg-gray-200" />
            </div>

            {/* Create section */}
            <SidebarMenu>
              {createItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    onClick={() => handleItemClick(item)}
                  >
                    <a className="flex items-center gap-2 transition-all duration-200 hover:text-google-blue hover:translate-x-1 group-hover:cursor-pointer relative before:content-[''] before:absolute before:-inset-1 before:rounded-lg before:bg-custom-purple-50 before:scale-x-0 before:opacity-0 hover:before:scale-x-100 hover:before:opacity-100 before:transition-all before:duration-300 before:origin-left">
                      <item.icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Upgrade Button */}
      <div className="px-3 mb-4">
        <button
          onClick={() => setIsPricingOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-custom-purple-300 to-google-blue text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
        >
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          <span className="font-medium">Upgrade Now</span>
        </button>
      </div>

      {/* Refer a Friend */}
      <div className="px-3">
        <ReferFriend />
      </div>

      {/* File Upload Dialog */}
      <FileUploadDialog 
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
      />

      {/* Pricing Modal */}
      <PricingModal 
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </Sidebar>
  );
}

