import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);

  return (
    <div className="flex items-center gap-4">
      <div className="bg-accent-rounded-lg flex h-[77px] w-[77px] items-center justify-center">
        <Image
          src={orderProduct.product.imageUrls[0]}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[90%] object-contain"
          alt={orderProduct.product.name}
        />
      </div>

      <div className="flex flex-col w-full gap-1">
        <div className="flex rounded-md bg-accent px-3 py-1 w-fit">
          <p className="text-[10px]">
            Vendido e entregue por: <span className="font-bold">SpaceTech</span>
          </p>
        </div>

        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex items-center w-full justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">
              R$ {productWithTotalPrice.totalPrice.toFixed(2).replace(".", ",")}
            </p>

            {productWithTotalPrice.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-60">
                R$
                {Number(productWithTotalPrice.basePrice)
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
            )}
          </div>

          <p className="opacity-60 text-xs">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProductItem;
