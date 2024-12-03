import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="text-3xl text-primary">
        <Sparkles className="w-8 h-8" />
      </div>
    </div>
  );
}