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


const Sidebar = () => {
  return (
    <main className="hidden min-w-[300px] flex-col gap-8 border-r border-solid border-accent p-8 lg:flex">
      <header className="flex items-center justify-between">
        <Logo />

        <ModeToggle />
      </header>

      <div className="flex flex-col gap-3">
        <Link href="/dashboard">
          <Button variant="outline" className="w-full justify-start gap-2">
            <LayoutDashboardIcon size={16} />
            Dashboard
          </Button>
        </Link>

        <Button variant="outline" className="w-full justify-start gap-2">
          <PackageIcon size={16} />
          Produtos
        </Button>

        <Button variant="outline" className="w-full justify-start gap-2">
          <ListOrderedIcon size={16} />
          Categorias
        </Button>

        <Button variant="outline" className="w-full justify-start gap-2">
          <PackageSearchIcon size={16} />
          Pedidos
        </Button>
      </div>
    </main>
  );
};

export default Sidebar;
