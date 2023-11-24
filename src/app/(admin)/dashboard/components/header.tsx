"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center justify-between border-b border-solid border-accent p-5 lg:hidden">
      <Logo />

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="lg:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="right">
          <div className="mt-6 flex items-center justify-between">
            <SheetHeader className="text-left text-lg font-semibold">
              Menu
            </SheetHeader>

            {status === "authenticated" && data?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2">
                    <Avatar className="border border-gray-300">
                      <AvatarFallback>
                        {data.user.name?.[0].toUpperCase()}
                      </AvatarFallback>

                      {data.user.image && <AvatarImage src={data.user.image} />}
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="text-left text-xs opacity-75">Olá,</p>
                      <p className="text-sm font-medium">{data.user.name}</p>
                    </div>
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
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LayoutDashboardIcon size={16} />
                  Dashboard
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/orders">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PackageIcon size={16} />
                  Produtos
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Categorias
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PackageSearchIcon size={16} />
                  Pedidos
                </Button>
              </Link>
            </SheetClose>
          </div>

          <div className="absolute bottom-6 left-6">
            <ModeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
