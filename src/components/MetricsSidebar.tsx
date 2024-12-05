import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";
import { AiInsights } from "@/components/AiInsights";
import { Campaign } from "@/components/campaign-table/types";

interface MetricsSidebarProps {
  campaigns: Campaign[];
}

export function MetricsSidebar({ campaigns }: MetricsSidebarProps) {
  return (
    <div className="hidden lg:block border-l w-[400px] h-screen overflow-hidden dark:border-custom-purple-400">
      <ScrollArea className="h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="w-6 h-6 text-custom-purple-300" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
              InsightX
            </h2>
          </div>
          <AiInsights campaigns={campaigns} />
        </div>
      </ScrollArea>
    </div>
  );
}
