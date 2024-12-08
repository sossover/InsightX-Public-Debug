import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Smartphone, Monitor, Tablet } from "lucide-react";

const deviceData = [
  { name: "Desktop", value: 52.8, color: "#4285F4", icon: Monitor },
  { name: "Mobile", value: 41.3, color: "#34A853", icon: Smartphone },
  { name: "Tablet", value: 5.9, color: "#EA4335", icon: Tablet },
];

const deviceMetrics = [
  { 
    device: "Desktop", 
    sessions: 15420, 
    bounceRate: 28.5, 
    avgDuration: 185,
    conversions: 342,
    conversionRate: 2.21
  },
  { 
    device: "Mobile", 
    sessions: 12180, 
    bounceRate: 42.3, 
    avgDuration: 145,
    conversions: 218,
    conversionRate: 1.78
  },
  { 
    device: "Tablet", 
    sessions: 1840, 
    bounceRate: 35.7, 
    avgDuration: 162,
    conversions: 35,
    conversionRate: 1.90
  },
];

export function DeviceAnalysis() {
  return (
    <div className="space-y-6 mt-6">
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Smartphone className="h-5 w-5 text-google-red" />
            <span>Device Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  content={({ payload }) => (
                    <div className="flex justify-center gap-4 mt-4">
                      {payload?.map((entry: any, index) => {
                        const device = deviceData[index];
                        const Icon = device.icon;
                        return (
                          <div key={entry.value} className="flex items-center gap-2">
                            <Icon className="h-4 w-4" style={{ color: device.color }} />
                            <span className="text-sm">{entry.value}: {device.value}%</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg">Device Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="device" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sessions" name="Sessions" fill="#4285F4" />
                <Bar dataKey="bounceRate" name="Bounce Rate %" fill="#34A853" />
                <Bar dataKey="avgDuration" name="Avg. Duration (s)" fill="#EA4335" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
