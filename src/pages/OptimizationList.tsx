import { NavigationSidebar } from "@/components/NavigationSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KanbanView } from "@/components/KanbanView";
import { OptimizationListItem } from "@/components/list/OptimizationListItem";
import { OptimizationItem } from "@/types/optimization";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Campaign } from "@/components/campaign-table/types";

export default function OptimizationList() {
  const [items, setItems] = useState<OptimizationItem[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'impact'>('date');
  const [viewType, setViewType] = useState<'list' | 'kanban'>('list');
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('optimizationItems');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      const itemsWithImpact = parsedItems.map((item: any) => ({
        ...item,
        impact: item.impact || getRandomImpact(),
      }));
      setItems(itemsWithImpact);
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-google-blue">Optimization List</h1>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Select value={sortBy} onValueChange={(value: 'date' | 'impact') => setSortBy(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Sort by Date</SelectItem>
                      <SelectItem value="impact">Sort by Impact</SelectItem>
                    </SelectContent>
                  </Select>
                  <Tabs value={viewType} onValueChange={(value: 'list' | 'kanban') => setViewType(value)} className="w-full sm:w-auto">
                    <TabsList>
                      <TabsTrigger value="list">List View</TabsTrigger>
                      <TabsTrigger value="kanban">Kanban View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <Tabs value={viewType} className="w-full">
                <TabsContent value="list" className="space-y-4">
                  {sortedItems.map((item) => (
                    <OptimizationListItem key={item.timestamp} item={item} />
                  ))}
                  {items.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      No optimization items added yet
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="kanban">
                  <div className="overflow-x-auto pb-4">
                    <KanbanView items={sortedItems} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
        <ChatPanel campaignData={campaigns} />
      </div>
    </SidebarProvider>
  );
}