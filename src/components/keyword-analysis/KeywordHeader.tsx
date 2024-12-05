import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface KeywordHeaderProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function KeywordHeader({ date, setDate }: KeywordHeaderProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 fixed w-full z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-xl sm:text-2xl font-bold text-google-blue">Keyword Analysis</h1>
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
        </div>
      </div>
    </nav>
  );
}