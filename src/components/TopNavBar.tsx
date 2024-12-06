import { Button } from "@/components/ui/button";
import { CalendarDays, Globe, HelpCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface TopNavBarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onPricingClick: () => void;
  onHelpClick: () => void;
}

export function TopNavBar({ date, setDate, onPricingClick, onHelpClick }: TopNavBarProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-google-blue" />
              <div className="text-xl font-bold text-google-blue">Geographic Performance</div>
            </div>
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
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onPricingClick}
              className="text-gray-600 hover:text-google-blue transition-colors duration-200"
            >
              Pricing
            </Button>
            <Button
              variant="ghost"
              onClick={onHelpClick}
              className="text-gray-600 hover:text-google-blue transition-colors duration-200"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              Help
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}