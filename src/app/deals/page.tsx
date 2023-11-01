import BadgeTitle from "@/components/ui/badge-title";
import { PercentIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductItem from "@/components/ui/product-item";

const DealsPage = async () => {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 p-5">
      <BadgeTitle icon={<PercentIcon size={16} />} title="Ofertas" />

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={computeProductTotalPrice(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
