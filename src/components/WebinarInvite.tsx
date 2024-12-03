import { Calendar } from "lucide-react";
import { Button } from "./ui/button";

export function WebinarInvite() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 space-y-4">
      <div className="relative h-40 overflow-hidden rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="People in a webinar"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-custom-purple-500">
          Marketing Analytics Masterclass
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>March 15, 2024 • 2:00 PM EST</span>
        </div>
        
        <p className="text-sm text-gray-600">
          Join industry experts to learn advanced marketing analytics strategies and boost your campaign performance.
        </p>
        
        <Button className="w-full bg-custom-purple-500 hover:bg-custom-purple-600">
          Reserve Your Spot
        </Button>
      </div>
    </div>
  );
}