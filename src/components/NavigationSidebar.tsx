import { Home, BarChart, Users, Settings, PieChart, TrendingUp, Globe, FileText, Download, Grid, Code, PlusCircle, KeyRound, LogOut, ListChecks, Sparkles } from "lucide-react";
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

const mainItems = [
  { title: "Overview", icon: Home, url: "/" },
  { title: "Campaign Performance", icon: TrendingUp, url: "/" },
  { title: "Geographic Analysis", icon: Globe, url: "/geo-report" },
  { title: "Keyword Analysis", icon: KeyRound, url: "/keyword-analysis" },
  { title: "Audience Insights", icon: Users, url: "/audience-insights" },
  { title: "Conversion Analysis", icon: BarChart, url: "/conversion-analysis" },
  { title: "Channel Mix", icon: PieChart, url: "/channel-mix" },
  { title: "Optimization List", icon: ListChecks, url: "/optimization-list" },
  { title: "Settings", icon: Settings, url: "/settings" },
];

const createItems = [
  { title: "Create", icon: PlusCircle, url: "#", isCreate: true },
  { title: "Templates", icon: Grid, url: "#" },
  { title: "Import", icon: Download, url: "#", isImport: true },
  { title: "Blank", icon: FileText, url: "#" },
  { title: "Create with AI", icon: Code, url: "#" },
];

export function NavigationSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

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
                    <a 
                      className={`flex items-center gap-2 transition-all duration-200 group-hover:cursor-pointer relative ${
                        item.isCreate 
                          ? 'bg-custom-purple-300 text-white rounded-lg px-4 py-2 hover:bg-custom-purple-400 hover:text-white' 
                          : 'hover:text-google-blue hover:translate-x-1 before:content-[\'\'] before:absolute before:-inset-1 before:rounded-lg before:bg-custom-purple-50 before:scale-x-0 before:opacity-0 hover:before:scale-x-100 hover:before:opacity-100 before:transition-all before:duration-300 before:origin-left'
                      }`}
                    >
                      <item.icon className={`w-4 h-4 relative z-10 ${item.isCreate ? 'text-white' : ''}`} />
                      <span className="relative z-10">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Logout Button */}
      <div className="px-3 mb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-google-blue transition-colors duration-200 group-hover:cursor-pointer relative before:content-[''] before:absolute before:-inset-1 before:rounded-lg before:bg-custom-purple-50 before:scale-x-0 before:opacity-0 hover:before:scale-x-100 hover:before:opacity-100 before:transition-all before:duration-300 before:origin-left"
        >
          <LogOut className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Logout</span>
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
    </Sidebar>
  );
}