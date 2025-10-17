import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "./ui/drawer";
import { Button } from "./ui/button";
import CartTable from "./CartTable";

export default function Cart({
  open,
  onOpenChange,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-white max-w-md p-6">
        <DrawerHeader>
          <DrawerTitle>Your Cart</DrawerTitle>
        </DrawerHeader>

        {cart.length === 0 ? (
          <p className="text-gray-500 mt-4">Your cart is empty.</p>
        ) : (
          <CartTable cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
        )}

        <DrawerFooter className="mt-4">
          <Button
            variant="secondary"
            onClick={clearCart}
            disabled={cart.length === 0}
            className="w-full bg-red-600 text-white hover:bg-red-700"
          >
            Clear Cart
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
