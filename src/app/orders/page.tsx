import BadgeTitle from "@/components/ui/badge-title";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";

const OrderPage = async () => {
  const user = getServerSession(authOptions);

  if (!user) {
    return <p>Access denied!</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="mt-5 flex flex-col gap-8 p-5">
      <BadgeTitle icon={<PackageSearchIcon size={16} />} title="Meus pedidos" />

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
