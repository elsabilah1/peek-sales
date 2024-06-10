"use client";

import { useSalesStore } from "@/store";
import { Sales } from "../types";
import { ReactNode } from "react";

export default function AppInitializer({
  sales,
  children,
}: {
  sales: Sales[];
  children: ReactNode;
}) {
  useSalesStore.setState({
    sales,
    salesTableResult: sales,
  });

  return children;
}
