"use client";

import { useSalesStore } from "@/store";
import Box from "./box";
import { useEffect, useState } from "react";
import { Sales } from "../types";

const formatValues = (sales: Sales[]) => ({
  salesTotal: sales.reduce((acc, item) => acc + item.sales, 0),
  revenueTotal: sales.reduce((acc, item) => acc + item.revenue, 0),
  bestSeller: sales.reduce(
    (max, curr) => (curr.sales > max.sales ? curr : max),
    sales[0]
  )?.product,
});

export default function Statistics() {
  const sales = useSalesStore((s) => s.sales);

  const [values, setValues] = useState(formatValues(sales));

  if (!sales) return;

  useEffect(() => {
    setValues(formatValues(sales));
  }, [sales]);

  return (
    <section className="grid gap-2 sm:grid-cols-3">
      <Box title="Sales total">
        <p className="text-3xl font-bold">
          {values.salesTotal}{" "}
          <span className="text-xs font-normal">products</span>
        </p>
      </Box>
      <Box title="Revenue total">
        <p className="text-3xl font-bold">${values.revenueTotal}</p>
      </Box>
      <Box title="Best seller">
        <p className="text-3xl font-bold">{values?.bestSeller ?? "-"}</p>
      </Box>
    </section>
  );
}
