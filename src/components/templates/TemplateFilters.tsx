import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface TemplateFiltersProps {
  show: boolean;
  onClose: () => void;
}

export function TemplateFilters({ show, onClose }: TemplateFiltersProps) {
  return (
    <div
      className={cn(
        "w-72 shrink-0 transition-all duration-300 ease-in-out",
        show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 hidden lg:block lg:translate-x-0 lg:opacity-100"
      )}
    >
      <div className="bg-white dark:bg-custom-purple-600 rounded-lg border border-gray-200 dark:border-custom-purple-400 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            ×
          </Button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-sm text-gray-600 dark:text-gray-300">Price Range</Label>
            <RadioGroup defaultValue="all" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="price-all" />
                <Label htmlFor="price-all">All Prices</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="price-free" />
                <Label htmlFor="price-free">Free</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="price-premium" />
                <Label htmlFor="price-premium">Premium</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Complexity */}
          <div>
            <Label className="text-sm text-gray-600 dark:text-gray-300">Complexity Level</Label>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="mt-4"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Basic</span>
              <span>Advanced</span>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <Label className="text-sm text-gray-600 dark:text-gray-300 mb-3 block">Features</Label>
            <div className="space-y-4">
              {[
                "Responsive Design",
                "Dark Mode",
                "Real-time Data",
                "Export Options",
                "Custom Widgets"
              ].map((feature) => (
                <div key={feature} className="flex items-center justify-between">
                  <Label htmlFor={feature} className="text-sm cursor-pointer">
                    {feature}
                  </Label>
                  <Switch id={feature} />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Last Updated */}
          <div>
            <Label className="text-sm text-gray-600 dark:text-gray-300">Last Updated</Label>
            <RadioGroup defaultValue="any" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="any" id="time-any" />
                <Label htmlFor="time-any">Any time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="week" id="time-week" />
                <Label htmlFor="time-week">This week</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="month" id="time-month" />
                <Label htmlFor="time-month">This month</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}