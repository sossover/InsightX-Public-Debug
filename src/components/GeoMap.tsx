import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const countryData = [
  { country: "Brazil", spend: 108.79, impressions: 1322, clicks: 56, conversions: 7 },
  { country: "Spain", spend: 66.3, impressions: 3840, clicks: 46, conversions: 0 },
  { country: "United Kingdom", spend: 60.72, impressions: 1250, clicks: 22, conversions: 0 },
  { country: "Poland", spend: 48.43, impressions: 2052, clicks: 32, conversions: 0 },
  { country: "France", spend: 40.1, impressions: 3125, clicks: 28, conversions: 1 },
];

export function GeoMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <Card className="col-span-2 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-google-blue">Spend by Country</span>
          <div className="h-2 w-2 rounded-full bg-google-green animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d60978985.73666363!2d-29.98604461271797!3d25.09940971080549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1709925431138!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 transition-opacity duration-300 hover:opacity-90"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$108.79</span>
          </div>
          <div className="h-2 bg-gradient-to-r from-blue-50 to-blue-500 rounded-full mt-1 animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}