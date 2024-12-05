import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

const defaultData = [
  { date: "26 Nov", spend: 5000, roas: 2.5, roasMin: 1.2, roasMax: 3.8 },
  { date: "27 Nov", spend: 4800, roas: 2.8, roasMin: 1.5, roasMax: 4.1 },
  { date: "28 Nov", spend: 6200, roas: 3.2, roasMin: 1.9, roasMax: 4.5 },
  { date: "29 Nov", spend: 5800, roas: 2.9, roasMin: 1.6, roasMax: 4.2 },
  { date: "30 Nov", spend: 5500, roas: 3.5, roasMin: 2.2, roasMax: 4.8 },
  { date: "1 Dec", spend: 4900, roas: 3.8, roasMin: 2.5, roasMax: 5.1 },
  { date: "2 Dec", spend: 5100, roas: 4.2, roasMin: 2.9, roasMax: 5.5 },
];

const generateRandomData = () => {
  const dates = ["26 Nov", "27 Nov", "28 Nov", "29 Nov", "30 Nov", "1 Dec", "2 Dec"];
  return dates.map(date => {
    const spend = Math.random() * 8000 + 4000;
    const roas = Math.random() * 3 + 2;
    const variance = Math.random() * 1.5 + 0.5;
    return {
      date,
      spend,
      roas,
      roasMin: roas - variance,
      roasMax: roas + variance,
    };
  });
};

interface PerformanceChartProps {
  useSampleData?: boolean;
}

export function PerformanceChart({ useSampleData = false }: PerformanceChartProps) {
  const data = useSampleData ? generateRandomData() : defaultData;
  const isMobile = useIsMobile();

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Spend vs ROAS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data}
              margin={{ 
                top: 5, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 0 : 20, 
                bottom: 5 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: isMobile ? 10 : 12 }}
                interval={isMobile ? 1 : 0}
              />
              <YAxis 
                yAxisId="left" 
                domain={[0, 8000]}
                label={isMobile ? null : { value: 'Spend ($)', angle: -90, position: 'insideLeft' }}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 6]}
                label={isMobile ? null : { value: 'ROAS', angle: 90, position: 'insideRight' }}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: isMobile ? 10 : 12 }} />
              <Area
                yAxisId="right"
                dataKey="roasMax"
                stroke="none"
                fill="#9b87f5"
                fillOpacity={0.3}
                name="ROAS Range"
              />
              <Area
                yAxisId="right"
                dataKey="roasMin"
                stroke="none"
                fill="#9b87f5"
                fillOpacity={0.3}
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="spend" 
                stroke="#4285F4" 
                name="Spend"
                strokeWidth={2}
                dot={{ strokeWidth: isMobile ? 1 : 2 }}
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="roas" 
                stroke="#34A853" 
                name="ROAS"
                strokeWidth={2}
                dot={{ strokeWidth: isMobile ? 1 : 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
