import { Button } from "@/components/ui/button";
import { Lightbulb, RefreshCw } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface AiInsightHeaderProps {
  onGenerate: () => void;
  isLoading: boolean;
}

export function AiInsightHeader({ onGenerate, isLoading }: AiInsightHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-google-blue" />
        <CardTitle className="text-lg">AI Insights</CardTitle>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onGenerate}
        disabled={isLoading}
        className="gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        Generate
      </Button>
    </CardHeader>
  );
}