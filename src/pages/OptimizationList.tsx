import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

interface OptimizationItem {
  text: string;
  timestamp: string;
}

export default function OptimizationList() {
  const [items, setItems] = useState<OptimizationItem[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('optimizationItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        <NavigationSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <h1 className="text-2xl font-bold text-google-blue mb-6">Optimization List</h1>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-gray-700">{item.text}</p>
                    <p className="text-sm text-gray-500 mt-2">Added: {new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No optimization items added yet
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
        <MetricsSidebar />
      </div>
    </SidebarProvider>
  );
}