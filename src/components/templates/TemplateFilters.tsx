import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface TemplateFiltersProps {
  onClose: () => void;
}

export function TemplateFilters({ onClose }: TemplateFiltersProps) {
  return (
    <div className="fixed right-0 top-0 z-50 h-full w-80 border-l bg-background p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="space-y-6">
        {/* Sort By */}
        <div className="space-y-4">
          <Label>Sort By</Label>
          <RadioGroup defaultValue="popular">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="popular" id="popular" />
              <Label htmlFor="popular">Most Popular</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recent" id="recent" />
              <Label htmlFor="recent">Recently Added</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="name" id="name" />
              <Label htmlFor="name">Name (A-Z)</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Features */}
        <div className="space-y-4">
          <Label>Features</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="customizable">Customizable</Label>
              <Switch id="customizable" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="responsive">Responsive</Label>
              <Switch id="responsive" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Complexity */}
        <div className="space-y-4">
          <Label>Complexity Level</Label>
          <RadioGroup defaultValue="all">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-levels" />
              <Label htmlFor="all-levels">All Levels</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner">Beginner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Intermediate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced">Advanced</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="flex-1" onClick={onClose}>
            Apply Filters
          </Button>
          <Button variant="outline" className="flex-1">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}