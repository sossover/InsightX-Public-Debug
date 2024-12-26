import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";

interface PlatformCardProps {
  name: string;
  description: string;
  onConnect: () => void;
  isLoading?: boolean;
}

export function PlatformCard({ name, description, onConnect, isLoading = false }: PlatformCardProps) {
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
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
        {isLoading ? "Connecting..." : "Connect"}
      </Button>
    </div>
  );
}