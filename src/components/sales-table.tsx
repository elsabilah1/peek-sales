"use client";

import { useSalesStore } from "@/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import SearchBar from "./search-bar";
import { formatLongDate } from "@/lib/utils";

export default function SalesTable() {
  const sales = useSalesStore((s) => s.salesTableResult);

  return (
    <section className="pt-5">
      <SearchBar />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Id</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.length > 0 ? (
            sales.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell className="font-bold">{item.product}</TableCell>
                <TableCell>{formatLongDate(new Date(item.date))}</TableCell>
                <TableCell className="text-right">{item.sales}</TableCell>
                <TableCell className="text-right">${item.revenue}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground">
                no result
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
