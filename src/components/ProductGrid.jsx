import { useEffect, useState } from "react";
import ProductCard from "./Product";
import { fetchProducts } from "../utils/apiFetch";

export default function ProductGrid({ cart, addToCart, removeFromCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <p className="text-center p-4">Loading products…</p>;
  if (error) return <p className="text-center p-4 text-red-500">{error}</p>;

  return (
    <div className="grid gap-y-6 gap-x-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
}
