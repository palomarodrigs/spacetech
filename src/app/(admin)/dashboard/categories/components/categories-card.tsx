import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";

interface CategoriesCardProps {
  categories: Prisma.CategoryGetPayload<{
    include: {
      products: {
        select: {
          id: true;
        };
      };
    };
  }>[];
}

const CategoriesCard = ({ categories }: CategoriesCardProps) => {
  return (
    <>
      {categories.map((category) => (
        <Card
          key={category.id}
          className="flex flex-col gap-5 hover:border-primary lg:hidden"
        >
          <div className="flex flex-col gap-3 p-3">
            <span className="flex flex-col font-medium">
              Nome
              <p className="text-sm opacity-75">{category.name}</p>
            </span>

            <span className="flex flex-col font-medium">
              Produtos
              <p className="text-sm opacity-75">{category.products.length}</p>
            </span>
          </div>
        </Card>
      ))}
    </>
  );
};

export default CategoriesCard;
