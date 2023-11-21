"use client";

import {
  LogOutIcon,
  LogInIcon,
  PackageSearchIcon,
  UserIcon,
} from "lucide-react";
import { Card } from "./card";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";
import SidebarNavigation from "./sidebar-navigation";
import CartMenu from "./cart-menu";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const Header = () => {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <Card className="flex items-center justify-between p-[1.25rem] lg:rounded-none lg:px-[6.25rem] lg:py-10">
      <SidebarNavigation />

      <Link href="/">
        <h1 className="text-lg font-semibold duration-300 hover:brightness-90 lg:text-2xl">
          <span className="bg-gradient-to-r from-[#5033C3] to-[#8162FF] bg-clip-text text-transparent">
            Space
          </span>
          Tech
        </h1>
      </Link>

      <div className="hidden lg:flex lg:gap-8">
        <Link href="/" className="nav">
          Início
        </Link>

        <div className="w-[2px] rounded bg-[#2A2A2A]"></div>

        <Link href="/catalog" className="nav">
          Catálogo
        </Link>

        <div className="w-[2px] rounded bg-[#2A2A2A]"></div>

        <Link href="/deals" className="nav">
          Ofertas
        </Link>
      </div>

      <div className="flex gap-7">
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`inline-flex h-10 items-center justify-center bg-background text-sm font-medium focus:ring-offset-background duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                status === "authenticated"
                  ? "rounded-full border-none p-0"
                  : "rounded-md border border-input p-2"
              }`}
            >
              {status === "authenticated" && data?.user && (
                <Avatar className="border border-input">
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>
              )}
              {status === "unauthenticated" && <UserIcon />}
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col gap-2 p-2">
              {status === "authenticated" && data?.user && (
                <>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <Link href="/orders">
                    <DropdownMenuItem className="flex cursor-pointer gap-1 text-xs">
                      <PackageSearchIcon size={14} />
                      Meus pedidos
                    </DropdownMenuItem>
                  </Link>

                  <Button
                    onClick={handleLogout}
                    className="h-8 gap-1 rounded-sm bg-gray-500 px-2 py-[0.375rem] text-left text-xs hover:bg-gray-600"
                  >
                    <LogOutIcon size={14} />
                    Fazer logout
                  </Button>
                </>
              )}

              {status === "unauthenticated" && (
                <Button
                  onClick={handleLogin}
                  className="h-8 gap-1 rounded-sm px-2 py-[0.375rem] text-left text-xs"
                >
                  <LogInIcon size={14} />
                  Fazer login
                </Button>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CartMenu />

        <div className="hidden lg:block">
          <ModeToggle />
        </div>
      </div>
    </Card>
  );
};

export default Header;
