import { Home, BarChart, Users, Settings, PieChart, TrendingUp, Globe, FileText, ListChecks } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

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

export function SidebarMainMenu() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
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
  );
}