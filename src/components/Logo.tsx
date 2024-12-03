import { Zap } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-google-blue text-white">
        <Zap className="w-5 h-5" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-google-blue to-google-green bg-clip-text text-transparent">
        Yoad
      </span>
    </div>
  );
}