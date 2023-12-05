import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prismaClient } from "@/lib/prisma";
import { format } from "date-fns";

const LatestOrderTable = async () => {
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
    <Card className="hidden max-h-[340px] overflow-y-auto lg:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">ID</TableHead>
            <TableHead className="text-center">Produtos</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>

              <TableCell className="text-center">
                {order.orderProduct.length}
              </TableCell>

              <TableCell className="text-center">
                {format(order.createdAt, "dd/MM/y")}
              </TableCell>

              <TableCell className="text-center">Pendente</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default LatestOrderTable;
