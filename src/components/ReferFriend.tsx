import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

export function ReferFriend() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200 space-y-4 mt-6">
      <div className="relative h-40 overflow-hidden rounded-lg">
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
  );
}