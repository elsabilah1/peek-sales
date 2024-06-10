"use client";

import { format } from "date-fns";
import Box from "./box";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  LineChart,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";
import { useSalesStore } from "@/store";

export default function SalesChart() {
  const sales = useSalesStore((s) => s.sales);

  return (
    <section className="grid gap-3 md:grid-cols-2">
      <Box title="Daily sales trend" className="h-48 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(val) => format(val, "LLL dd")}
              className="text-xs"
            />
            <YAxis dataKey="sales" className="text-xs" />
            <Tooltip
              content={(props) => (
                <div>
                  {props.payload?.map((item, i) => {
                    return (
                      <div
                        className="rounded-md bg-background px-4 py-2 text-xs shadow-lg"
                        key={i}
                      >
                        <p>product: {item?.payload?.product}</p>
                        <p>sales: {item?.payload?.sales}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#000000" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <Box title="Product sales comparison" className="h-40 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sales}>
            <Tooltip
              content={(props) => (
                <div>
                  {props.payload?.map((item, i) => {
                    return (
                      <div
                        className="rounded-md bg-background px-4 py-2 text-xs shadow-lg"
                        key={i}
                      >
                        <p>product: {item?.payload?.product}</p>
                        <p>sales: {item?.payload?.sales}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            />
            <Legend />
            <XAxis dataKey="product" className="text-xs" />
            <YAxis dataKey="sales" className="text-xs" />
            <Bar dataKey="sales" className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </section>
  );
}
