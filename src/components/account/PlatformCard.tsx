import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PlatformCardProps {
  name: string;
  description: string;
  onConnect: () => void;
}

export function PlatformCard({ name, description, onConnect }: PlatformCardProps) {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Button
        onClick={onConnect}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Connect
      </Button>
    </div>
  );
}