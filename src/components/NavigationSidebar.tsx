import { Home, BarChart, Users, Settings, PieChart, TrendingUp, Globe, FileText, Download, Grid, Code, PlusCircle } from "lucide-react";
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

const mainItems = [
  { title: "Overview", icon: Home, url: "/" },
  { title: "Campaign Performance", icon: TrendingUp, url: "/" },
  { title: "Geographic Analysis", icon: Globe, url: "/geo-report" },
  { title: "Audience Insights", icon: Users, url: "#" },
  { title: "Conversion Analysis", icon: BarChart, url: "#" },
  { title: "Channel Mix", icon: PieChart, url: "#" },
  { title: "Settings", icon: Settings, url: "#" },
];

const createItems = [
  { title: "Create", icon: PlusCircle, url: "#", isCreate: true },
  { title: "Templates", icon: Grid, url: "#" },
  { title: "Import", icon: Download, url: "#" },
  { title: "Blank", icon: FileText, url: "#" },
  { title: "Create with AI", icon: Code, url: "#" },
];

export function NavigationSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-3 py-4">
            <h2 className="text-2xl font-bold text-google-blue mb-1">Yoad</h2>
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
                    <a className="flex items-center gap-2 transition-all duration-200 hover:text-google-blue hover:translate-x-1">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
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
                    onClick={() => item.url.startsWith("/") && navigate(item.url)}
                  >
                    <a 
                      className={`flex items-center gap-2 transition-all duration-200 hover:text-google-blue hover:translate-x-1 ${
                        item.isCreate ? 'bg-custom-purple-300 text-white rounded-lg px-4 py-2 hover:bg-custom-purple-400 hover:text-white' : ''
                      }`}
                    >
                      <item.icon className={`w-4 h-4 ${item.isCreate ? 'text-white' : ''}`} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}