import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

interface EngagementTrendsProps {
  data: Array<{
    month: string;
    engagement: number;
    users: number;
  }>;
}

export function EngagementTrends({ data }: EngagementTrendsProps) {
  return (
    <Card className="bg-white shadow-lg border-none hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-custom-purple-500 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Engagement Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#6E59A5"
                tick={{ fill: '#6E59A5' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#4285F4"
                tick={{ fill: '#4285F4' }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#34A853"
                tick={{ fill: '#34A853' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="engagement" 
                stroke="#4285F4" 
                name="Engagement Rate"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="users" 
                stroke="#34A853" 
                name="Total Users"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}