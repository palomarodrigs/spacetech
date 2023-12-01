import { prismaClient } from "@/lib/prisma";
import ProductsTable, {
  ProductWithTotalPriceAndCategory,
} from "../components/products-table";
import { computeProductTotalPrice } from "@/helpers/product";
import BadgeTitle from "@/components/ui/badge-title";
import { PackageIcon } from "lucide-react";

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const productsWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    products.map((product) => ({
      ...product,
      totalPrice: computeProductTotalPrice(product),
    }));
  return (
    <main className="flex flex-col gap-4 p-5 lg:gap-5 lg:p-8">
      <BadgeTitle icon={<PackageIcon size={16} />} title="Produtos" />

      <span className="text-lg font-bold">
        Produtos encontrados: {products.length}
      </span>

      <ProductsTable products={productsWithTotalPrice} />
    </main>
  );
};

export default ProductsPage;
