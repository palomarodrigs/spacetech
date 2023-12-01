"use client";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();
  return (
    <main className="hidden min-w-[300px] flex-col gap-8 border-r border-solid border-accent p-8 lg:flex">
      <header className="flex items-center justify-between">
        <Logo />

        <ModeToggle />
      </header>

      <div className="flex flex-col gap-3">
        <Link href="/dashboard">
          <Button
            variant="outline"
            className={`link w-full justify-start gap-2 ${
              path === "/dashboard"
                ? "active bg-primary text-white hover:bg-primary hover:text-white"
                : ""
            }`}
          >
            <LayoutDashboardIcon size={16} />
            Dashboard
          </Button>
        </Link>

        <Link href="/dashboard/products">
          <Button
            variant="outline"
            className={`link w-full justify-start gap-2 ${
              path === "/dashboard/products"
                ? "active bg-primary text-white hover:bg-primary hover:text-white"
                : ""
            }`}
          >
            <PackageIcon size={16} />
            Produtos
          </Button>
        </Link>

        <Link href="/dashboard/categories">
          <Button
            variant="outline"
            className={`link w-full justify-start gap-2 ${
              path === "/dashboard/categories"
                ? "active bg-primary text-white hover:bg-primary hover:text-white"
                : ""
            }`}
          >
            <ListOrderedIcon size={16} />
            Categorias
          </Button>
        </Link>

        <Link href="/dashboard/orders">
          <Button
            variant="outline"
            className={`link w-full justify-start gap-2 ${
              path === "/dashboard/orders"
                ? "active bg-primary text-white hover:bg-primary hover:text-white"
                : ""
            }`}
          >
            <PackageSearchIcon size={16} />
            Pedidos
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Sidebar;
