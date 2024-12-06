import { Sparkles } from "lucide-react";

export function SidebarHeader() {
  return (
    <div className="px-3 py-4">
      <div className="flex items-center gap-2 cursor-pointer">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
          InsightX
        </h2>
        <Sparkles className="w-5 h-5 text-google-blue animate-pulse" />
      </div>
      <p className="text-sm text-gray-500">Marketing Analytics</p>
    </div>
  );
}