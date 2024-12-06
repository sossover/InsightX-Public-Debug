import { ChevronLeft } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FileUploadDialog } from "./FileUploadDialog";
import { PricingModal } from "./PricingModal";
import { Button } from "./ui/button";
import { SidebarHeader } from "./navigation/SidebarHeader";
import { SidebarMainMenu } from "./navigation/SidebarMainMenu";
import { SidebarCreateMenu } from "./navigation/SidebarCreateMenu";
import { SidebarFooter } from "./navigation/SidebarFooter";

export function NavigationSidebar() {
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className={`absolute -right-4 top-1/2 z-50 transform -translate-y-1/2 bg-white shadow-sm border rounded-full hover:bg-gray-50 transition-all duration-200 ${
          isCollapsed ? "-right-4" : "-right-4"
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`} />
      </Button>

      <div className={`transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"}`}>
        <Sidebar className="border-r border-gray-200 group">
          {/* Upgrade Button */}
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsPricingOpen(true)}
              className="bg-custom-purple-500 hover:bg-custom-purple-600 text-white"
            >
              Upgrade Now
            </Button>
          </div>

          <SidebarContent>
            <SidebarGroup>
              <SidebarHeader />
              <SidebarGroupContent>
                <SidebarMainMenu />

                <div className="my-6 px-3">
                  <div className="h-px bg-gray-200" />
                </div>

                <SidebarCreateMenu onImportClick={() => setIsUploadDialogOpen(true)} />
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <FileUploadDialog 
            isOpen={isUploadDialogOpen}
            onClose={() => setIsUploadDialogOpen(false)}
          />

          <PricingModal 
            isOpen={isPricingOpen}
            onClose={() => setIsPricingOpen(false)}
          />
        </Sidebar>
      </div>
    </div>
  );
}