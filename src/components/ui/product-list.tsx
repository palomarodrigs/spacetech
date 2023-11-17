"use client";

import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const productViewLimit = 5;

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 1024);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setVisibleProducts(products.slice(0, productViewLimit));
    } else {
      setVisibleProducts(products);
    }
  }, [isDesktop, products, productViewLimit]);

  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 lg:gap-[2.68rem] lg:px-[100px] [&::-webkit-scrollbar]:hidden">
      {visibleProducts.map((product) => (
        <div
          key={product.id}
          className="w-[170px] max-w-[170px] lg:w-[180px] lg:max-w-[180px]"
        >
          <ProductItem product={computeProductTotalPrice(product)} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
