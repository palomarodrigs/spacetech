import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="flex h-[150px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-category-item-gradient lg:h-[185px] lg:w-[386px]">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain lg:max-h-[80%] lg:max-w-[90%]"
          />
        </div>

        <div className="rounded-bl-lg rounded-br-lg bg-accent py-3 lg:w-[386px] lg:py-4">
          <p className="text-center text-sm font-semibold lg:text-lg">
            {category.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItem;
