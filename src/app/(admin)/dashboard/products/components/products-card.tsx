import { Card } from "@/components/ui/card";
import { ProductWithTotalPrice } from "@/helpers/product";

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  };
};

interface ProductsCardProps {
  products: ProductWithTotalPriceAndCategory[];
}

const ProductsCard = async ({ products }: ProductsCardProps) => {
  return (
    <>
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex flex-col gap-5 hover:border-primary lg:hidden"
        >
          <div className="flex flex-col gap-3 p-3">
            <span className="flex flex-col font-medium">
              Nome
              <p className="text-sm opacity-75">{product.name}</p>
            </span>

            <div className="flex gap-5">
              <span className="flex flex-col font-medium">
                Categoria
                <p className="text-center text-sm opacity-75">
                  {product.category.name}
                </p>
              </span>

              <span className="flex flex-col font-medium">
                Preço total
                <p className="text-center text-sm opacity-75">
                  {product.totalPrice.toFixed(2).replace(".", ",")}
                </p>
              </span>

              <span className="flex flex-col font-medium">
                Preço base
                <p className="text-center text-sm opacity-75">
                  {Number(product.basePrice).toFixed(2).replace(".", ",")}
                </p>
              </span>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default ProductsCard;
