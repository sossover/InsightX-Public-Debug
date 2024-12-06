import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/ui/sidebar";
import { SidebarGroup } from "@/components/ui/sidebar";
import { SidebarHeader } from "./navigation/SidebarHeader";
import { SidebarMainMenu } from "./navigation/SidebarMainMenu";
import { SidebarCreateMenu } from "./navigation/SidebarCreateMenu";
import { FileUploadDialog } from "./FileUploadDialog";
import { ChevronLeft } from "lucide-react";

export function NavigationSidebar() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative h-screen">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-4 right-0 transform translate-x-1/2 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full transition-transform duration-300 ${
          isCollapsed ? "rotate-180" : ""
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className={`transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"}`}>
        <Sidebar className="border-r border-gray-200 group">
          <SidebarContent>
            <SidebarGroup>
              <SidebarHeader />
              <SidebarMainMenu />
              <SidebarCreateMenu onUploadClick={() => setIsUploadDialogOpen(true)} />
            </SidebarGroup>
          </SidebarContent>

          <FileUploadDialog 
            isOpen={isUploadDialogOpen}
            onClose={() => setIsUploadDialogOpen(false)}
          />
        </Sidebar>
      </div>
    </div>
  );
}