import ProductGrid from "../components/ProductGrid";

export default function Home({ cart, addToCart, removeFromCart }) {
  return (
    <section className="container mx-auto">
      <ProductGrid
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </section>
  );
}
