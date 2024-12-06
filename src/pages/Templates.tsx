import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Layout, Grid, List } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const templates = [
  {
    id: 1,
    title: "Marketing Dashboard",
    description: "Complete overview of your marketing performance with real-time metrics and KPIs",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    category: "Marketing",
    tags: ["Analytics", "KPI", "Performance"],
  },
  {
    id: 2,
    title: "Sales Analytics",
    description: "Track your sales metrics and performance with advanced visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    category: "Sales",
    tags: ["Revenue", "Metrics", "Growth"],
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Monitor your social media engagement across all platforms",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=60",
    category: "Social",
    tags: ["Engagement", "Social", "Analytics"],
  },
  {
    id: 4,
    title: "E-commerce Overview",
    description: "Track your online store performance with detailed insights",
    image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&auto=format&fit=crop&q=60",
    category: "E-commerce",
    tags: ["Sales", "Products", "Inventory"],
  },
  {
    id: 5,
    title: "Content Performance",
    description: "Analyze your content engagement metrics and optimize strategy",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800&auto=format&fit=crop&q=60",
    category: "Content",
    tags: ["Content", "SEO", "Analytics"],
  },
  {
    id: 6,
    title: "SEO Dashboard",
    description: "Monitor your search engine optimization with comprehensive metrics",
    image: "https://images.unsplash.com/photo-1572177812156-58036aae439c?w=800&auto=format&fit=crop&q=60",
    category: "SEO",
    tags: ["Search", "Rankings", "Traffic"],
  },
];

const categories = ["All", "Marketing", "Sales", "Social", "E-commerce", "Content", "SEO"];

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header with gradient text */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent">
            Dashboard Templates
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Choose from our collection of pre-built dashboard templates to get started quickly. 
            Each template is fully customizable to match your needs.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "rounded-r-none",
                  viewMode === "grid" && "bg-accent"
                )}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setViewMode("list")}
                className={cn(
                  "rounded-l-none",
                  viewMode === "list" && "bg-accent"
                )}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Templates Grid/List */}
        <div className={cn(
          "grid gap-6",
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer animate-fade-in"
            >
              <CardContent className={cn(
                "p-0",
                viewMode === "list" && "flex"
              )}>
                <div className={cn(
                  "relative overflow-hidden",
                  viewMode === "grid" ? "aspect-video" : "w-48 h-48"
                )}>
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="text-white font-medium">Preview Template</span>
                  </div>
                </div>
                <div className={cn(
                  "p-6 flex flex-col gap-3",
                  viewMode === "list" && "flex-1"
                )}>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-custom-purple-300 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{template.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-custom-purple-50 text-custom-purple-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}