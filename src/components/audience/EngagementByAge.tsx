import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck } from "lucide-react";

interface EngagementByAgeProps {
  data: Array<{
    age: string;
    users: number;
    engagement: number;
    growth: number;
  }>;
}

export function EngagementByAge({ data }: EngagementByAgeProps) {
  return (
    <Card className="bg-white shadow-lg border-none hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-custom-purple-500 flex items-center gap-2">
          <UserCheck className="h-5 w-5" />
          Engagement by Age Group
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((group) => (
            <div
              key={group.age}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 hover:shadow-md"
            >
              <div className="space-y-1">
                <span className="font-medium text-gray-900">{group.age}</span>
                <div className="text-sm text-gray-500">
                  {group.users.toLocaleString()} users
                </div>
              </div>
              <div className="text-right">
                <div className="text-google-blue font-medium">
                  {group.engagement}% engagement
                </div>
                <div className="text-sm text-google-green">
                  +{group.growth}% growth
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}