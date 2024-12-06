import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface TemplateCardProps {
  template: {
    title: string;
    description: string;
    category: string;
    image: string;
    metrics: string[];
    popularity: number;
  };
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <img
            src={template.image}
            alt={template.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            {template.category}
          </Badge>
          <h3 className="font-semibold">{template.title}</h3>
          <p className="text-sm text-muted-foreground">{template.description}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {template.metrics.map((metric) => (
            <Badge key={metric} variant="outline" className="text-xs">
              {metric}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{template.popularity}</span>
        </div>
        <Button size="sm">Use Template</Button>
      </CardFooter>
    </Card>
  );
}