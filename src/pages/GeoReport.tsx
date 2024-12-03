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
      <div className="relative min-h-screen flex w-full">
        {/* Black Friday Banner */}
        <div className="fixed top-0 left-0 right-0 z-[9999] w-full bg-gradient-to-r from-custom-purple-300 to-custom-purple-500 text-white py-3 text-center font-semibold shadow-lg">
          🎉 Black Friday Sale - 60% Off All Plans! Limited Time Only 🎉
        </div>

        {/* Purple Decorative Shapes */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-custom-purple-100 rounded-full blur-3xl opacity-20 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-0 w-96 h-96 bg-custom-purple-200 rounded-full blur-3xl opacity-20 -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <NavigationSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Adjusted top navigation for banner */}
          <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-30 mt-12">
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
          <main className="mt-28">
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
