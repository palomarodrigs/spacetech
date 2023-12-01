import BadgeTitle from "@/components/ui/badge-title";
import { prismaClient } from "@/lib/prisma";
import { ListOrderedIcon } from "lucide-react";
import CategoriesTable from "./components/categories-table";

const CategoriesPage = async () => {
  const categories = await prismaClient.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });
  return (
    <main className="flex flex-col gap-4 p-5 lg:gap-5 lg:p-8">
      <BadgeTitle icon={<ListOrderedIcon size={16} />} title="Categorias" />

      <span className="text-lg font-bold">
        Categorias encontradas: {categories.length}
      </span>

      <CategoriesTable categories={categories} />
    </main>
  );
};

export default CategoriesPage;
