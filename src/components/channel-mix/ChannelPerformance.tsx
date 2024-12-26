import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BarChart as BarChartIcon } from "lucide-react";

interface PerformanceData {
  name: string;
  conversions: number;
  ctr: string;
  cpa: number;
  color: string;
}

interface ChannelPerformanceProps {
  data: PerformanceData[];
}

export function ChannelPerformance({ data }: ChannelPerformanceProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">
          <div className="flex items-center gap-2">
            <BarChartIcon className="w-5 h-5 text-google-blue" />
            Channel Performance
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="conversions" fill="#4285F4" name="Conversions" />
              <Bar dataKey="cpa" fill="#34A853" name="CPA ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}