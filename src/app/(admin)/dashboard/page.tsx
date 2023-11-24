import { Separator } from "@/components/ui/separator";
import TopSide from "./components/topside";
import CardsSummary from "./components/cards-summary";

const DashboardPage = () => {
  return (
    <main className="w-full lg:p-8">
      <TopSide />

      <Separator className="lg:mb-6 lg:mt-6" />

      <CardsSummary />
    </main>
  );
};

export default DashboardPage;
