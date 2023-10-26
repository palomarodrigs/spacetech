"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearchIcon,
  Percent,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Separator } from "./separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import Cart from "./cart";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";

const Header = () => {
  const { status, data } = useSession();

  const { products } = useContext(CartContext);

  const cartQuantityItems = products.length;

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Card className="flex items-center justify-between p-[1.25rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <div className="mt-6 flex justify-between">
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{data.user.name}</p>
                      <p className="text-left text-xs opacity-75">
                        Boas compras!
                      </p>
                    </div>

                    <Avatar className="border border-gray-300">
                      <AvatarFallback>
                        {data.user.name?.[0].toUpperCase()}
                      </AvatarFallback>

                      {data.user.image && <AvatarImage src={data.user.image} />}
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2">
                  <Button
                    onClick={handleLogout}
                    className="gap-2 bg-gray-500 text-left text-xs hover:bg-gray-600"
                  >
                    <LogOutIcon size={14} />
                    Fazer logout
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {status === "unauthenticated" && (
              <Button onClick={handleLogin} className="gap-2 text-left">
                <LogInIcon size={16} />
                Fazer login
              </Button>
            )}
          </div>

          <Separator className="mb-6 mt-6" />

          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/orders">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PackageSearchIcon size={16} />
                  Meus pedidos
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Percent size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="bg-gradient-to-r from-[#5033C3] to-[#8162FF] bg-clip-text text-transparent">
            Space
          </span>
          Tech
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            {cartQuantityItems > 0 && (
              <span className="absolute right-[12px] top-[12px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500  text-sm font-bold text-white">
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
    </Card>
  );
};

export default Header;
