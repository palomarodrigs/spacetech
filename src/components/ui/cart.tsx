import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { Badge } from "@/components/ui/badge";
import { PackageOpenIcon, ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Button } from "./button";
import Link from "next/link";
import { SheetClose } from "./sheet";
import { Separator } from "./separator";

const Cart = () => {
  const { products, subtotal, totalDiscount, total } = useContext(CartContext);
  return (
    <>
      {products.length > 0 ? (
        <div className="flex flex-col gap-8">
          <Badge
            className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
            variant="outline"
          >
            <ShoppingCartIcon size={16} />
            Carrinho
          </Badge>

          <div className="flex flex-col gap-5">
            {products.map((product) => (
              <CartItem
                key={product.id}
                product={computeProductTotalPrice(product as any) as any}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Separator />

            <div className="flex items-center justify-between text-xs">
              <p>Subtotal</p>
              <p>R$ {subtotal.toFixed(2).replace(".", ",")}</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <p>Entrega</p>
              <p className="uppercase">Grátis</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-xs">
              <p>Descontos</p>
              <p className="uppercase">
                - R$ {totalDiscount.toFixed(2).replace(".", ",")}
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-sm font-bold">
              <p>Total</p>
              <p className="uppercase">
                R$ {total.toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center gap-2">
          <PackageOpenIcon size={35} />

          <div className="flex flex-col items-center">
            <p className="opacity-75">
              Carrinho <span className="font-bold">vazio</span>.
            </p>
            <p>Vamos fazer compras?</p>
          </div>

          <SheetClose asChild>
            <Link href="/">
              <Button>Comprar agora</Button>
            </Link>
          </SheetClose>
        </div>
      )}
    </>
  );
};

export default Cart;
