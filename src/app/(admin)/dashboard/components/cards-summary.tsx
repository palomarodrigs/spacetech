import { Card } from "@/components/ui/card";
import { prismaClient } from "@/lib/prisma";
import {
  BadgeDollarSignIcon,
  ContainerIcon,
  PackageSearchIcon,
} from "lucide-react";

const CardsSummary = async () => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <div className="flex gap-5 p-5 lg:p-0">
      <Card className="flex w-[340px] items-center gap-2 p-3 hover:border-primary lg:gap-4 lg:p-5 duration-300">
        <div className="hidden rounded-md border border-primary p-2 lg:block lg:p-3">
          <BadgeDollarSignIcon size={20} />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold">Vendas</p>
          <span className="text-xs opacity-75">{orders.length}</span>
        </div>
      </Card>

      <Card className="flex w-[340px] items-center gap-2 p-3 hover:border-primary lg:gap-4 lg:p-5 duration-300">
        <div className="hidden rounded-md border border-primary p-2 lg:block lg:p-3">
          <ContainerIcon size={20} />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold">Estoque</p>
          <span className="text-xs opacity-75">{products.length}</span>
        </div>
      </Card>

      <Card className="flex w-[340px] items-center gap-2 p-3 hover:border-primary lg:gap-4 lg:p-5 duration-300">
        <div className="hidden rounded-md border border-primary p-2 lg:block lg:p-3">
          <PackageSearchIcon size={20} />
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold">Pedidos</p>
          <span className="text-xs opacity-75">{orders.length}</span>
        </div>
      </Card>
    </div>
  );
};

export default CardsSummary;
