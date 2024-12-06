import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";

interface AgeDistributionProps {
  data: Array<{
    age: string;
    users: number;
    engagement: number;
    growth: number;
  }>;
}

export function AgeDistribution({ data }: AgeDistributionProps) {
  return (
    <Card className="bg-white shadow-lg border-none hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-custom-purple-500 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Age Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="age" 
                stroke="#6E59A5"
                tick={{ fill: '#6E59A5' }}
              />
              <YAxis 
                stroke="#4285F4"
                tick={{ fill: '#4285F4' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar 
                dataKey="users" 
                fill="#4285F4" 
                name="Users"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}