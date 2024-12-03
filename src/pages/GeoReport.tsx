import { NavigationSidebar } from "@/components/NavigationSidebar";
import { MetricsSidebar } from "@/components/MetricsSidebar";
import { GeoMap } from "@/components/GeoMap";
import { CountryStats } from "@/components/CountryStats";
import { DeviceStats } from "@/components/DeviceStats";
import { AiInsights } from "@/components/AiInsights";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Footer } from "@/components/Footer";

const GeoReport = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <div className="text-xl font-bold text-google-blue">Yoad</div>
                  <div className="flex items-center gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <GeoMap />
                <AiInsights />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <CountryStats />
                </div>
                <DeviceStats />
              </div>
            </div>
          </main>

          <Footer />
        </div>

        <MetricsSidebar />
      </div>
    </SidebarProvider>
  );
};

export default GeoReport;