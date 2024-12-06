import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export function ViewToggle({ viewMode, setViewMode }: ViewToggleProps) {
  return (
    <div className="flex border rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setViewMode("grid")}
        className={cn(
          "rounded-r-none",
          viewMode === "grid" && "bg-accent"
        )}
      >
        <Grid className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setViewMode("list")}
        className={cn(
          "rounded-l-none",
          viewMode === "list" && "bg-accent"
        )}
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  );
}