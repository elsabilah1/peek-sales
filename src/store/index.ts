import { create } from "zustand";
import { Sales } from "../types";
import { lastDayOfMonth } from "date-fns";
import { formatDate } from "@/lib/utils";

interface SalesState {
  keyword: string;
  start_date: string;
  end_date: string;
  sales: Sales[];
  salesTableResult: Sales[];
}

const start = new Date(2024, 5, 1);

export const useSalesStore = create<SalesState>()((set) => ({
  keyword: "",
  start_date: formatDate(start),
  end_date: formatDate(lastDayOfMonth(start)),
  sales: [],
  salesTableResult: [],
}));
