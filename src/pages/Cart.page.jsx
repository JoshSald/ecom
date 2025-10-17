import CartTable from "../components/CartTable";
import { Button } from "../components/ui/button";

export default function CartPage({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
}) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <CartTable cart={cart} onAdd={addToCart} onRemove={removeFromCart} />
          <div className="mt-4 flex justify-end gap-2">
            <Button
              onClick={clearCart}
              className="bg-gray-600 hover:bg-gray-700"
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
