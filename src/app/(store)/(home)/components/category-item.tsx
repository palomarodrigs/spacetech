import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";

import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div>
      <Link href={`/category/${category.slug}`}>
        <Badge
          variant="outline"
          className="flex items-center justify-center gap-2 rounded-lg py-3 lg:px-[2.2rem]"
        >
          {CATEGORY_ICON[category.slug as keyof typeof CategoryItem]}
          <span className="text-xs font-bold">{category.name}</span>
        </Badge>
      </Link>
    </div>
  );
};

export default CategoryItem;
