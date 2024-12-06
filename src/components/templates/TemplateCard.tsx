import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, Share2, Star } from "lucide-react";

export function TemplateCard() {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Preview Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
          alt="Dashboard Template"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <Button size="sm" className="bg-white/90 hover:bg-white text-black">
              Preview
            </Button>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/90 hover:bg-white text-black">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save template</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/90 hover:bg-white text-black">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share template</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg mb-1">Analytics Dashboard</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1">4.8</span>
              </div>
              <span>•</span>
              <span>2.1k uses</span>
            </div>
          </div>
          <Badge variant="secondary">Premium</Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Badge variant="outline" className="bg-custom-purple-50">Analytics</Badge>
          <Badge variant="outline" className="bg-custom-purple-50">Charts</Badge>
          <Badge variant="outline" className="bg-custom-purple-50">KPI</Badge>
        </div>
      </div>
    </Card>
  );
}