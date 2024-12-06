import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateCard } from "@/components/templates/TemplateCard";

const templates = [
  {
    id: 1,
    title: "Marketing Analytics",
    description: "Complete marketing performance tracking dashboard",
    category: "Marketing",
    image: "/placeholder.svg",
    metrics: ["ROI", "Conversions", "Traffic"],
    popularity: 4.8,
  },
  {
    id: 2,
    title: "Sales Dashboard",
    description: "Real-time sales monitoring and forecasting",
    category: "Sales",
    image: "/placeholder.svg",
    metrics: ["Revenue", "Pipeline", "Deals"],
    popularity: 4.9,
  },
  {
    id: 3,
    title: "Social Media Analytics",
    description: "Track social media performance and engagement",
    category: "Marketing",
    image: "/placeholder.svg",
    metrics: ["Engagement", "Reach", "Growth"],
    popularity: 4.7,
  },
  {
    id: 4,
    title: "E-commerce Dashboard",
    description: "Monitor online store performance and sales",
    category: "E-commerce",
    image: "/placeholder.svg",
    metrics: ["Sales", "Orders", "Inventory"],
    popularity: 4.6,
  }
];

export default function Templates() {
  return (
    <div className="flex h-full min-h-screen flex-col space-y-8 bg-background p-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Templates</h2>
        <p className="text-muted-foreground">
          Choose a template to get started with your analytics dashboard
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          className="pl-10"
        />
      </div>

      {/* Templates Grid */}
      <ScrollArea className="h-full pr-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}