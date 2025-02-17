import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return format(date, "yyyy-LL-dd");
}

export function formatLongDate(date: Date) {
  return format(date, "LLL dd, y");
}
