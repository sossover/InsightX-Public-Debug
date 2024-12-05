import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Mail, Phone, MessageSquare } from "lucide-react";

const sources = [
  {
    name: "Website Forms",
    count: 145,
    change: "+12.3%",
    icon: Globe,
    color: "bg-google-blue"
  },
  {
    name: "Email Campaigns",
    count: 89,
    change: "+8.1%",
    icon: Mail,
    color: "bg-google-green"
  },
  {
    name: "Phone Calls",
    count: 64,
    change: "+5.4%",
    icon: Phone,
    color: "bg-google-red"
  },
  {
    name: "Chat Support",
    count: 42,
    change: "+15.2%",
    icon: MessageSquare,
    color: "bg-custom-purple-300"
  }
];

export function ConversionSources() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-custom-purple-500">
          Conversion Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {sources.map((source) => {
            const Icon = source.icon;
            return (
              <div
                key={source.name}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${source.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-700">{source.name}</p>
                    <p className="text-sm text-gray-500">{source.count} conversions</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-google-green">
                  {source.change}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}