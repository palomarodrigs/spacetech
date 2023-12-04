import BadgeTitle from "@/components/ui/badge-title";
import { PackageSearchIcon } from "lucide-react";
import { prismaClient } from "@/lib/prisma";
import OrderItem from "@/app/(store)/orders/components/order-item";

const OrdersPage = async () => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <main className="flex flex-col gap-4 p-5 lg:gap-5 lg:p-8">
      <BadgeTitle icon={<PackageSearchIcon size={16} />} title="Pedidos" />

      <span className="text-lg font-bold">
        Pedidos encontrados: {orders.length}
      </span>

      <div className="flex flex-col gap-5 overflow-auto lg:max-h-[523px] lg:gap-0">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </main>
  );
};

export default OrdersPage;
