import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Home, CartPage, navLinks } from "./utils/ImportPages.util";
import "./index.css";

const STORAGE_KEY = "cart";

export default function App() {
  const [cart, setCart] = useState(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  return (
    <>
      <Header links={navLinks} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
      </Routes>

      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-4 right-4 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition"
      >
        Cart ({cart.length})
      </button>

      <Cart
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </>
  );
}
