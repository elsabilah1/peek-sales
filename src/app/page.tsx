import AppInitializer from "@/components/app-initializer";
import SalesChart from "@/components/sales-chart";
import SalesTable from "@/components/sales-table";
import Statistics from "@/components/statistics";
import { _axios } from "@/lib/api";

export default async function Home() {
  const res = await _axios.get("/sales");

  return (
    <AppInitializer sales={res.data}>
      <main className="my-4 space-y-3">
        <Statistics />
        <SalesChart />
        <hr />
        <SalesTable />
      </main>
    </AppInitializer>
  );
}
