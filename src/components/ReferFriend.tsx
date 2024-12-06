import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ReferFriend() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full flex items-center gap-2 text-sm hover:bg-custom-purple-50"
        >
          <Share2 className="w-4 h-4" />
          Refer a Friend
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="space-y-4">
          <div className="relative h-32 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
              alt="People collaborating"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-lg text-google-blue">
              Refer a Friend
            </h3>
            
            <p className="text-sm text-gray-600">
              Get 1 month free when your friend joins our platform. They'll get a special discount too!
            </p>
            
            <Button className="w-full bg-google-blue hover:bg-google-blue/90 flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Now
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}