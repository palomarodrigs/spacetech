import BadgeTitle from "@/components/ui/badge-title";
import { ShapesIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./components/category-item";

const CatalogPage = async () => {
  const categories = await prismaClient.category.findMany();

  return (
    <div className="flex flex-col gap-8 p-5">
      <BadgeTitle icon={<ShapesIcon size={16} />} title="Catálogo"  />

      <div className="grid grid-cols-2 flex-wrap gap-8">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
