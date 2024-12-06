import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Layers, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function AiFeatureShowcase() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "AI Analysis Complete",
        description: "Your personalized marketing insights have been generated.",
      });
    }, 2000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-custom-purple-50 to-white opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-custom-purple-100 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-custom-purple-500" />
            <span className="text-custom-purple-500 font-semibold">AI-Powered Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Experience the Power of AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Try our AI-powered marketing analysis tool and get instant insights
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:border-custom-purple-300 transition-all duration-300">
            <div className="flex gap-4 mb-6">
              <Input
                placeholder="Enter your marketing campaign details..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className="bg-custom-purple-500 hover:bg-custom-purple-600 min-w-[120px]"
              >
                {isGenerating ? (
                  <Sparkles className="w-4 h-4 animate-spin" />
                ) : (
                  "Generate"
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Campaign Performance Analysis",
                "Audience Insights",
                "Competitor Analysis",
                "ROI Optimization"
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 hover:border-custom-purple-300 transition-all duration-300 hover:shadow-md group"
                >
                  <Sparkles className="w-5 h-5 text-custom-purple-500 mb-2 group-hover:animate-bounce" />
                  <h3 className="font-semibold text-gray-900">{feature}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get AI-powered insights about your {feature.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}