"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { _axios } from "@/lib/api";
import { useSalesStore } from "@/store";

export default function SearchBar() {
  const { keyword, start_date, end_date } = useSalesStore();

  return (
    <div className="relative mb-2">
      <Input
        onChange={async (e) => {
          const keyword = e.target.value;
          const endpoint = `/sales?product_like=${keyword}&date_gte=${start_date}&date_lte=${end_date}`;
          const res = await _axios.get(endpoint);
          useSalesStore.setState({ salesTableResult: res.data, keyword });
        }}
        id="keyword"
        value={keyword}
        placeholder="Search product by name ..."
      />
      <label
        htmlFor="keyword"
        className="absolute inset-y-0 right-1 my-2 grid place-items-center bg-background px-2"
      >
        <Search className="size-4 stroke-muted-foreground" />
      </label>
    </div>
  );
}
