"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import DiscountBadge from "@/components/ui/discount-badge";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import TruckFastIcon from "./truck-fast-icon";
import { CartContext } from "@/providers/cart";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { status } = useSession();

  const isUnauthenticated = status === "unauthenticated";

  const [quantity, setQuantity] = useState(1);

  const { addProductToCart } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCartClick = () => {
    if (isUnauthenticated) {
      return toast.error("Entre na sua conta para adicionar ao carrinho!");
    }

    addProductToCart({ ...product, quantity });
    toast.success("Adicionado ao carrinho com sucesso!");
  };

  return (
    <div className="flex flex-col px-5 lg:rounded-2xl lg:bg-accent lg:p-10">
      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-1">
        <h1 className="text-xl font-bold">
          R$ {product.totalPrice.toFixed(2).replace(".", ",")}
        </h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>{product.discountPercentage}</DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm opacity-75">
          De:{" "}
          <span className="line-through">
            R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
          </span>
        </p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          onClick={handleDecreaseQuantityClick}
        >
          <ArrowLeftIcon size={16} />
        </Button>

        <span>{quantity}</span>

        <Button
          size="icon"
          variant="outline"
          onClick={handleIncreaseQuantityClick}
        >
          <ArrowRightIcon size={16} />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-3 ">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-justify text-sm opacity-60 lg:max-h-[220px] lg:overflow-hidden">
          {product.description}
        </p>
      </div>

      <Button
        className="mt-10 font-bold uppercase"
        onClick={handleAddToCartClick}
      >
        Adicionar ao carrinho
      </Button>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-accent px-[22px] py-2 dark:bg-[#2A2A2A] lg:bg-gray-200">
        <div className="flex items-center gap-2">
          <TruckFastIcon />

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">STPacket®</span>
            </p>
            <p className="text-xs text-[#8162FF]">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>

        <p className="text-xs font-bold">Frete Grátis</p>
      </div>
    </div>
  );
};

export default ProductInfo;
