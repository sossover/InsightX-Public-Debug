import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Search, Layout, LayoutDashboard } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: "1",
    title: "Analytics Dashboard",
    description: "Comprehensive analytics with key metrics and insights",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    tags: ["Analytics", "Charts", "KPI"],
  },
  {
    id: "2",
    title: "E-commerce Overview",
    description: "Track sales, inventory, and customer metrics",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    tags: ["Sales", "Inventory", "Customers"],
  },
  {
    id: "3",
    title: "Marketing Performance",
    description: "Monitor campaign performance and ROI",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    tags: ["Marketing", "Campaigns", "ROI"],
  },
  {
    id: "4",
    title: "Financial Overview",
    description: "Track revenue, expenses, and financial metrics",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    tags: ["Finance", "Revenue", "Metrics"],
  },
];

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Templates</h1>
          <p className="text-gray-500">Choose from our collection of pre-built dashboard templates</p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-1 gap-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setLayout("grid")}
            >
              <Layout className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setLayout("list")}
            >
              <LayoutDashboard className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className={`grid gap-6 ${
          layout === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id}
              className="group hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <Button variant="secondary" className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                      Use Template
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-gray-500 mb-4">{template.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}