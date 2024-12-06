import { ArrowUpRight } from "lucide-react";
import { ReferFriend } from "@/components/ReferFriend";

interface SidebarFooterProps {
  onUpgradeClick: () => void;
}

export function SidebarFooter({ onUpgradeClick }: SidebarFooterProps) {
  return (
    <>
      <div className="px-3 mb-4">
        <button
          onClick={onUpgradeClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-custom-purple-300 to-google-blue text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
        >
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          <span className="font-medium">Upgrade Now</span>
        </button>
      </div>

      <div className="px-3">
        <ReferFriend />
      </div>
    </>
  );
}