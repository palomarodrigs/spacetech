import BadgeTitle from "@/components/ui/badge-title";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearchIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";
import AccessDenied from "@/components/ui/access-denied";

export const dynamic = "force-dynamic";

const OrderPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return <AccessDenied />;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
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
