import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TemplateCardProps {
  template: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    tags: string[];
  };
  viewMode: "grid" | "list";
}

export function TemplateCard({ template, viewMode }: TemplateCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer animate-fade-in">
      <CardContent className={`p-0 ${viewMode === "list" && "flex"}`}>
        <div className={`relative overflow-hidden ${
          viewMode === "grid" ? "aspect-video" : "w-48 h-48"
        }`}>
          <img
            src={template.image}
            alt={template.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <span className="text-white font-medium">Preview Template</span>
          </div>
        </div>
        <div className={`p-6 flex flex-col gap-3 ${viewMode === "list" && "flex-1"}`}>
          <div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-custom-purple-300 transition-colors">
              {template.title}
            </h3>
            <p className="text-gray-500 text-sm">{template.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-custom-purple-50 text-custom-purple-300"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}