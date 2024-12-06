import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { Badge } from "@/components/ui/badge";

const categories = [
  "All Templates",
  "Marketing",
  "Sales",
  "Analytics",
  "E-commerce",
  "Social Media",
  "Custom",
];

const templates = [
  {
    id: 1,
    title: "Marketing Dashboard Pro",
    description: "Comprehensive marketing analytics with advanced metrics tracking",
    category: "Marketing",
    image: "/placeholder.svg",
    metrics: ["ROI", "Conversion Rate", "Customer Acquisition"],
    popularity: 4.8,
  },
  // Add more template objects here
];

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All Templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="flex h-full min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Templates</h2>
            <p className="text-muted-foreground">
              Choose from our collection of professional dashboard templates
            </p>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Search and Categories */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 p-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200 hover:scale-105"
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>

      {/* Filters Sidebar */}
      {showFilters && (
        <TemplateFilters onClose={() => setShowFilters(false)} />
      )}
    </div>
  );
}