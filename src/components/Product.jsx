import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

export default function ProductCard({
  product,
  cart,
  addToCart,
  removeFromCart,
}) {
  const inCart = cart.some((p) => p.id === product.id);

  return (
    <Card className="flex flex-col justify-between h-full shadow-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold">{product.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-grow flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-48 object-contain"
        />
      </CardContent>

      <CardDescription className="p-4 text-sm text-gray-600">
        {product.description.slice(0, 80)}...
      </CardDescription>

      <CardFooter className="p-4 flex flex-col gap-2">
        <p className="font-bold">{product.price}€</p>
        {inCart ? (
          <Button
            className="bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            onClick={() => removeFromCart(product.id)}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            className="bg-sky-800 text-white py-2 rounded-md hover:bg-sky-500 transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
