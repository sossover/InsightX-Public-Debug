import { useEffect, useState } from "react";
import { Layers2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function RealTimeAnalytics() {
  const [data, setData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 10 }, (_, i) => ({
      time: `${i}s ago`,
      value: Math.floor(Math.random() * 100),
    }));
    setData(initialData);

    // Update data every second
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1), {
          time: "now",
          value: Math.floor(Math.random() * 100),
        }];
        // Update time labels
        return newData.map((point, i) => ({
          ...point,
          time: i === newData.length - 1 ? "now" : `${newData.length - 1 - i}s ago`,
        }));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-custom-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Layers2 className="w-5 h-5 text-custom-purple-500" />
            <span className="text-custom-purple-500 font-semibold">Real-Time Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Watch Your Data Flow
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience real-time analytics visualization with live data updates
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time"
                  stroke="#6E59A5"
                />
                <YAxis 
                  stroke="#6E59A5"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #6E59A5",
                    borderRadius: "8px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{ fill: "#6E59A5" }}
                  activeDot={{ r: 8, fill: "#9b87f5" }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Active Users", value: "1,234" },
              { label: "Page Views", value: "5,678" },
              { label: "Conversion Rate", value: "3.45%" },
              { label: "Avg. Session", value: "2m 34s" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg border border-gray-200 text-center hover:border-custom-purple-300 transition-all duration-300 hover:shadow-md"
              >
                <div className="text-2xl font-bold text-custom-purple-500">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}