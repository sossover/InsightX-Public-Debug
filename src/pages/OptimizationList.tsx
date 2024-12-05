import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanView } from "@/components/KanbanView";

interface OptimizationItem {
  text: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
}

const impactColors = {
  high: 'text-google-red',
  medium: 'text-google-yellow',
  low: 'text-google-green',
};

export default function OptimizationList() {
  const [items, setItems] = useState<OptimizationItem[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'impact'>('date');
  const [viewType, setViewType] = useState<'list' | 'kanban'>('list');

  useEffect(() => {
    const savedItems = localStorage.getItem('optimizationItems');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      // Add impact if it doesn't exist for older items
      const itemsWithImpact = parsedItems.map((item: any) => ({
        ...item,
        impact: item.impact || getRandomImpact(),
      }));
      setItems(itemsWithImpact);
      // Update localStorage with impact scores
      localStorage.setItem('optimizationItems', JSON.stringify(itemsWithImpact));
    }
  }, []);

  const getRandomImpact = () => {
    const impacts: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
    return impacts[Math.floor(Math.random() * impacts.length)];
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    }
  });

  return (
    <SidebarProvider>
      <div className="relative min-h-screen flex w-full">
        <NavigationSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 flex flex-col pt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-google-blue">Optimization List</h1>
                <div className="flex gap-4">
                  <Select value={sortBy} onValueChange={(value: 'date' | 'impact') => setSortBy(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Sort by Date</SelectItem>
                      <SelectItem value="impact">Sort by Impact</SelectItem>
                    </SelectContent>
                  </Select>
                  <Tabs value={viewType} onValueChange={(value: 'list' | 'kanban') => setViewType(value)}>
                    <TabsList>
                      <TabsTrigger value="list">List View</TabsTrigger>
                      <TabsTrigger value="kanban">Kanban View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <Tabs value={viewType}>
                <TabsContent value="list" className="space-y-4">
                  {sortedItems.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="text-gray-700">{item.text}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Added: {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className={`ml-4 px-3 py-1 rounded-full text-sm font-medium ${impactColors[item.impact]}`}>
                        {item.impact.charAt(0).toUpperCase() + item.impact.slice(1)} Impact
                      </span>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      No optimization items added yet
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="kanban">
                  <KanbanView items={sortedItems} />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
        <MetricsSidebar />
      </div>
    </SidebarProvider>
  );
}