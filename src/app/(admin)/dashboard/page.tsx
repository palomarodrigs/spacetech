import { Separator } from "@/components/ui/separator";
import TopSide from "./components/topside";
import CardsSummary from "./components/cards-summary";
import LatestOrderTable from "./components/latest-order-table";

const DashboardPage = () => {
  return (
    <main className="w-full lg:p-8">
      <TopSide />

      <Separator className="lg:mb-6 lg:mt-6" />

      <CardsSummary />

      <h2 className="mb-2 ml-5 mt-8 text-lg font-semibold lg:mb-4 lg:ml-0 lg:mt-[50px]">
        Pedidos mais recentes
      </h2>

      <LatestOrderTable />
    </main>
  );
};

export default DashboardPage;
