import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { AdAccountSelector } from "./AdAccountSelector";

interface ReportHeaderProps {
  title: string;
  description?: string;
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  showDateSelector?: boolean;
  onAccountChange?: (accountId: string) => void;
}

export function ReportHeader({ 
  title, 
  description, 
  date, 
  setDate, 
  showDateSelector = true,
  onAccountChange 
}: ReportHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 p-8">
      <div>
        <h1 className="text-3xl font-bold text-custom-purple-500">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        <AdAccountSelector 
          onAccountChange={onAccountChange}
          className="w-[250px]"
        />
        
        {showDateSelector && setDate && (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[250px] justify-start text-left font-normal"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
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
        )}
      </div>
    </div>
  );
}