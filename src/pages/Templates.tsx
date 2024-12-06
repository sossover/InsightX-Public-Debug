import { Layout } from "lucide-react";
import { useState } from "react";
import { NavigationSidebar } from "@/components/NavigationSidebar";
import { TopNavBar } from "@/components/TopNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TemplateCard } from "@/components/templates/TemplateCard";
import { TemplateFilters } from "@/components/templates/TemplateFilters";
import { ViewToggle } from "@/components/templates/ViewToggle";
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
  const [date, setDate] = useState<Date | undefined>(new Date());
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
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          <TopNavBar 
            date={date} 
            setDate={setDate}
            onPricingClick={() => {}} 
            onHelpClick={() => {}}
          />

          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                {/* Filters and View Toggle */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <TemplateFilters
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      categories={categories}
                    />
                  </div>
                  <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
                </div>

                {/* Templates Grid/List */}
                <div className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                )}>
                  {filteredTemplates.map((template) => (
                    <TemplateCard 
                      key={template.id} 
                      template={template} 
                      viewMode={viewMode}
                    />
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
