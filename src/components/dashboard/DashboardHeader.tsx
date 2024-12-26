import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, ChevronDown } from "lucide-react";
import { format } from "date-fns";

interface DashboardHeaderProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  isTopPanelOpen: boolean;
  setIsTopPanelOpen: (isOpen: boolean) => void;
  setIsPricingOpen: (isOpen: boolean) => void;
  setIsHelpOpen: (isOpen: boolean) => void;
}

export function DashboardHeader({
  date,
  setDate,
  isTopPanelOpen,
  setIsTopPanelOpen,
  setIsPricingOpen,
  setIsHelpOpen,
}: DashboardHeaderProps) {
  return (
    <div className="fixed w-full z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 transition-all duration-300 ease-in-out dark:bg-custom-purple-600/80 dark:border-custom-purple-400">
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isTopPanelOpen ? "h-32" : "h-0"}`}>
        <div className="p-4 flex justify-end space-x-4">
          <Button
            variant="ghost"
            onClick={() => setIsPricingOpen(true)}
            className="text-gray-600 hover:text-google-blue transition-colors duration-200"
          >
            Pricing
          </Button>
          <Button
            variant="ghost"
            onClick={() => setIsHelpOpen(true)}
            className="text-gray-600 hover:text-google-blue transition-colors duration-200"
          >
            Help
          </Button>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[140px] sm:w-[240px] justify-start text-left font-normal">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span className="truncate">
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </span>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsTopPanelOpen(!isTopPanelOpen)}
            className="ml-auto"
          >
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isTopPanelOpen ? "transform rotate-180" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}