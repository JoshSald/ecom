import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";

export default function CartTable({ cart, onAdd, onRemove }) {
  const cartWithQuantity = cart.reduce((acc, product) => {
    const existing = acc.find((p) => p.id === product.id);
    if (existing) existing.quantity += 1;
    else acc.push({ ...product, quantity: 1 });
    return acc;
  }, []);

  const total = cartWithQuantity.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartWithQuantity.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">
                ${item.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onAdd(item)}
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  +
                </Button>
                <Button
                  size="sm"
                  onClick={() => onRemove(item.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  -
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-end font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>
    </>
  );
}
