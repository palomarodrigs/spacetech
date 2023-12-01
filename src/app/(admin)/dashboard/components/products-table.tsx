import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ProductWithTotalPrice } from "@/helpers/product";

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  };
};

interface ProductsTableProps {
  products: ProductWithTotalPriceAndCategory[];
}

const ProductsTable = async ({ products }: ProductsTableProps) => {
  return (
    <Card className="hidden max-h-[523px] overflow-y-auto lg:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Nome</TableHead>
            <TableHead className="text-center">Categoria</TableHead>
            <TableHead className="text-center">Preço total</TableHead>
            <TableHead className="text-center">Preço base</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>

              <TableCell className="text-center">
                {product.category.name}
              </TableCell>

              <TableCell className="text-center">
                {product.totalPrice.toFixed(2).replace(".", ",")}
              </TableCell>

              <TableCell className="text-center">
                {Number(product.basePrice).toFixed(2).replace(".", ",")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ProductsTable;
