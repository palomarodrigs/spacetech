import { Card } from "@/components/ui/card";
import { prismaClient } from "@/lib/prisma";
import { format } from "date-fns";

const LatestOrderCard = async () => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderProduct: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  return (
    <div className="flex flex-col gap-4 pb-5 pl-5 pr-5">
      {orders.map((order) => (
        <Card
          key={order.id}
          className="flex flex-col gap-5 hover:border-primary lg:hidden"
        >
          <div className="flex flex-col gap-3 p-3">
            <span className="flex flex-col font-medium">
              ID
              <p className="text-sm opacity-75">{order.id}</p>
            </span>

            <div className="flex gap-5">
              <span className="flex flex-col font-medium">
                Produtos
                <p className="text-center text-sm opacity-75">
                  {order.orderProduct.length}
                </p>
              </span>

              <span className="flex flex-col font-medium">
                Data
                <p className="text-center text-sm opacity-75">
                  {format(order.createdAt, "dd/MM/y")}
                </p>
              </span>

              <span className="flex flex-col font-medium">
                Status
                <p className="text-center text-sm opacity-75">Pendente</p>
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LatestOrderCard;
