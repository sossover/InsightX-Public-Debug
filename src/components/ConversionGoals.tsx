import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Award, TrendingUp } from "lucide-react";

const goals = [
  {
    title: "Monthly Target",
    current: 220,
    target: 300,
    icon: Target,
    color: "bg-google-blue"
  },
  {
    title: "Quarterly Goal",
    current: 580,
    target: 800,
    icon: Award,
    color: "bg-google-green"
  },
  {
    title: "Year-to-Date",
    current: 1800,
    target: 3000,
    icon: TrendingUp,
    color: "bg-custom-purple-300"
  }
];

export function ConversionGoals() {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-custom-purple-500">
          Conversion Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const Icon = goal.icon;
          
          return (
            <div key={goal.title} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${goal.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-sm text-gray-700">{goal.title}</span>
                </div>
                <span className="text-sm font-semibold">
                  {goal.current} / {goal.target}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}