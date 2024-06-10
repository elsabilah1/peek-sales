"use client";

import React from "react";
import { DateRange } from "react-day-picker";
import { cn, formatDate, formatLongDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { _axios } from "@/lib/api";
import { useSalesStore } from "@/store";

export default function DateFilter() {
  const { start_date, end_date } = useSalesStore();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(start_date),
    to: new Date(end_date),
  });

  const handleFilter = async () => {
    const start_date = date?.from && formatDate(date.from);
    const end_date = date?.to && formatDate(date.to);

    useSalesStore.setState({ start_date, end_date });
    const endpoint = `/sales?date_gte=${start_date}&date_lte=${end_date}`;

    const res = await _axios.get(endpoint);

    useSalesStore.setState({
      keyword: "",
      sales: res.data,
      salesTableResult: res.data,
    });
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            onClick={() => setOpen(true)}
            className={cn(
              "justify-between gap-5 text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {formatLongDate(date.from)} - {formatLongDate(date.to)}
                  </>
                ) : (
                  formatLongDate(date.from)
                )
              ) : (
                <span>Filter by date</span>
              )}
            </div>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>k
            </kbd>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={() => handleFilter()}>Filter</Button>
    </div>
  );
}
