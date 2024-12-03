import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { date: "26 Nov", spend: 5000, budget: 10000 },
  { date: "27 Nov", spend: 4800, budget: 10000 },
  { date: "28 Nov", spend: 6200, budget: 10000 },
  { date: "29 Nov", spend: 5800, budget: 10000 },
  { date: "30 Nov", spend: 5500, budget: 10000 },
  { date: "1 Dec", spend: 4900, budget: 9800 },
  { date: "2 Dec", spend: 5100, budget: 9500 },
];

export function PerformanceChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Spend vs Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="spend" stroke="#4285F4" name="Spend" />
              <Line type="monotone" dataKey="budget" stroke="#EA4335" name="Budget" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}