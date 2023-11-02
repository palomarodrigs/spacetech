import BadgeTitle from "@/components/ui/badge-title";
import { LayoutGridIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany();

  return (
    <div className="flex flex-col gap-8 p-5 lg:px-[100px] lg:py-10">
      <BadgeTitle icon={<LayoutGridIcon size={16} />} title="Catálogo" />

      <div className="grid grid-cols-2 flex-wrap gap-8 lg:grid-cols-3 lg:gap-10">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
