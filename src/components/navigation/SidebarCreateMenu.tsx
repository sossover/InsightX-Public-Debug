import { FileText, LayoutTemplate, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

const createItems = [
  { title: "Import", icon: FileText, url: "#", isImport: true },
  { title: "Templates", icon: LayoutTemplate, url: "/templates" },
  { title: "Pricing", icon: DollarSign, url: "/pricing" },
];

interface SidebarCreateMenuProps {
  onImportClick: () => void;
}

export function SidebarCreateMenu({ onImportClick }: SidebarCreateMenuProps) {
  const navigate = useNavigate();

  const handleItemClick = (item: any) => {
    if (item.isImport) {
      onImportClick();
    } else if (item.url.startsWith("/")) {
      navigate(item.url);
    }
  };

  return (
    <SidebarMenu>
      {createItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
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
  );
}