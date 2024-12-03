import { Home, BarChart, Users, Settings, PieChart, TrendingUp, Globe } from "lucide-react";
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

const items = [
  { title: "Overview", icon: Home, url: "/" },
  { title: "Campaign Performance", icon: TrendingUp, url: "/" },
  { title: "Geographic Analysis", icon: Globe, url: "/geo-report" },
  { title: "Audience Insights", icon: Users, url: "#" },
  { title: "Conversion Analysis", icon: BarChart, url: "#" },
  { title: "Channel Mix", icon: PieChart, url: "#" },
  { title: "Settings", icon: Settings, url: "#" },
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
              {items.map((item) => (
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}