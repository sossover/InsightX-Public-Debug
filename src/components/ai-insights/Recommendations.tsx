import { Check, Plus, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useToast } from "@/components/ui/use-toast";

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  useEffect(() => {
    const savedItems = localStorage.getItem('optimizationItems');
    if (savedItems) {
      const items = JSON.parse(savedItems);
      const existingTexts = new Set(items.map((item: any) => item.text));
      const newAddedItems = new Set<number>();
      recommendations.forEach((rec, index) => {
        if (existingTexts.has(rec)) {
          newAddedItems.add(index);
        }
      });
      setAddedItems(newAddedItems);
    }
  }, [recommendations]);

  const getRandomImpact = () => {
    const impacts = ['high', 'medium', 'low'] as const;
    return impacts[Math.floor(Math.random() * impacts.length)];
  };

  const handleAddItem = (recommendation: string, index: number) => {
    if (addedItems.has(index)) return;

    const newAddedItems = new Set(addedItems);
    newAddedItems.add(index);
    setAddedItems(newAddedItems);

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Save to localStorage with impact score
    const savedItems = localStorage.getItem('optimizationItems');
    const items = savedItems ? JSON.parse(savedItems) : [];
    const newItem = {
      text: recommendation,
      timestamp: new Date().toISOString(),
      impact: getRandomImpact(),
    };
    localStorage.setItem('optimizationItems', JSON.stringify([...items, newItem]));

    toast({
      title: "Added to Optimization List",
      description: "The recommendation has been added to your optimization list.",
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Zap className="h-4 w-4 text-google-green" />
        <h3 className="font-semibold text-sm">Recommendations</h3>
      </div>
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <p className="text-sm text-gray-600">{recommendation}</p>
            </div>
            <button
              onClick={() => handleAddItem(recommendation, index)}
              disabled={addedItems.has(index)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                addedItems.has(index)
                  ? "bg-green-100 text-green-600"
                  : "bg-custom-purple-100 text-custom-purple-600 hover:bg-custom-purple-200"
              }`}
            >
              {addedItems.has(index) ? (
                <Check className="w-4 h-4" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to action items</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}