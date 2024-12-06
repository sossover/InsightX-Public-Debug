import { useState } from "react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { Footer } from "@/components/Footer";
import { Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-custom-purple-300 to-google-blue bg-clip-text text-transparent mb-2">
                  Dashboard Templates
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose from our collection of professionally designed dashboard templates
                </p>
              </div>

              {/* Search and Filters Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className={cn(
                      "gap-2",
                      showFilters && "bg-custom-purple-50 text-custom-purple-500"
                    )}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Category Scroll */}
              <ScrollArea className="w-full mb-8 whitespace-nowrap">
                <div className="flex space-x-4 pb-4">
                  {["All", "Analytics", "E-commerce", "Marketing", "Finance", "Sales", "HR", "Custom"].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.toLowerCase())}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              {/* Main Content */}
              <div className="flex gap-8">
                {/* Filters Panel */}
                <TemplateFilters 
                  show={showFilters}
                  onClose={() => setShowFilters(false)}
                />

                {/* Templates Grid */}
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <TemplateCard key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Templates;