import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import DiscountBadge from "./discount-badge";
import Link from "next/link";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-3 dark:border-zinc-700 lg:w-[180px]">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent lg:h-[190px]">
          <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
            alt={product.name}
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold lg:text-lg">
                  R$ {product.totalPrice.toFixed(2).replace(".", ",")}
                </p>

                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs line-through opacity-75">
                  R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
                </p>
              </>
            ) : (
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold lg:text-lg">
                R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
