import BadgeTitle from "@/components/ui/badge-title";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import {
  PackageSearchIcon,
  PackageXIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";
import AccessDenied from "@/components/ui/access-denied";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      {orders.length > 0 ? (
        <BadgeTitle
          icon={<PackageSearchIcon size={16} />}
          title="Meus pedidos"
        />
      ) : null}

      <div className="flex flex-col gap-5">
        {orders.length > 0 ? (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <div className="mt-[14.5rem] flex flex-col items-center justify-center gap-2">
            <PackageXIcon size={35} />

            <div className="text-center">
              <h2 className="text-lg font-bold">Sem pedidos finalizados!</h2>

              <p className="opacity-75">
                Você precisa adicionar produtos ao seu carrinho e finalizar o
                pedido.
              </p>
            </div>

            <Link href="/">
              <Button className="mt-3 gap-2 text-left">
                <ShoppingCartIcon size={16} />
                Comprar agora
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
