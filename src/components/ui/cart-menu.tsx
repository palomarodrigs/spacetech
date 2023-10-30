import { ShoppingCartIcon } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

const CartMenu = () => {
  const { products } = useContext(CartContext);

  const cartQuantityItems = products.length;
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            {cartQuantityItems > 0 && (
              <span className="absolute right-[12px] top-[12px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white lg:right-[95px] lg:top-[30px]">
                {cartQuantityItems}
              </span>
            )}
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[350px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartMenu;
