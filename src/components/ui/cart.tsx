import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import BadgeTitle from "./badge-title";
import { PackageOpenIcon, ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Button } from "./button";
import Link from "next/link";
import { SheetClose } from "./sheet";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, subtotal, totalDiscount, total } = useContext(CartContext);
  const { data } = useSession();

  const handleFinishPayment = async () => {
    if (!data?.user) {
      return;
    }

    await createOrder(products, (data?.user as any).id);

    toast.success("Pedido finalizado com sucesso!");
  };

  return (
    <div className="flex h-full flex-col gap-8">
      {products.length > 0 ? (
        <BadgeTitle icon={<ShoppingCartIcon size={16} />} title="Carrinho" />
      ) : null}

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={{
                    ...product,
                    totalPrice: computeProductTotalPrice(product),
                  }}
                />
              ))
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
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
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
            <p>- R$ {totalDiscount.toFixed(2).replace(".", ",")}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p>Total</p>
            <p>R$ {total.toFixed(2).replace(".", ",")}</p>
          </div>

          <Button
            className="mt-7 font-bold uppercase"
            onClick={handleFinishPayment}
          >
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
