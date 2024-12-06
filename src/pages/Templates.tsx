import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const templates = [
  {
    id: 1,
    title: "Marketing Dashboard",
    description: "Complete overview of your marketing performance",
    image: "/placeholder.svg",
    category: "Marketing",
  },
  {
    id: 2,
    title: "Sales Analytics",
    description: "Track your sales metrics and performance",
    image: "/placeholder.svg",
    category: "Sales",
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Monitor your social media engagement",
    image: "/placeholder.svg",
    category: "Social",
  },
  {
    id: 4,
    title: "E-commerce Overview",
    description: "Track your online store performance",
    image: "/placeholder.svg",
    category: "E-commerce",
  },
  {
    id: 5,
    title: "Content Performance",
    description: "Analyze your content engagement metrics",
    image: "/placeholder.svg",
    category: "Content",
  },
  {
    id: 6,
    title: "SEO Dashboard",
    description: "Monitor your search engine optimization",
    image: "/placeholder.svg",
    category: "SEO",
  },
];

export default function Templates() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Dashboard Templates</h1>
          <p className="text-gray-500">
            Choose from our collection of pre-built dashboard templates to get started quickly
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search templates..."
            className="pl-10 w-full max-w-md"
          />
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="aspect-video w-full bg-gray-100 relative overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="text-white font-medium">Preview Template</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{template.title}</h3>
                  <p className="text-gray-500 text-sm">{template.description}</p>
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium text-custom-purple-300 bg-custom-purple-50 rounded-full">
                      {template.category}
                    </span>
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