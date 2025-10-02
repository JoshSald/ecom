import { fetchProducts } from "./scripts/apiFetch.js";
import { addToCart, removeFromCart } from "./scripts/localStorage.js";
import { renderProducts, renderCart } from "./scripts/domElements.js";

const productGrid = document.getElementById("product-grid");
const cartList = document.getElementById("cart-list");

async function init() {
  try {
    const products = await fetchProducts();
    console.log(fetchProducts());
    renderProducts(
      products,
      productGrid,
      handleAddToCart,
      handleRemoveFromCart
    );
    renderCart(cartList, handleRemoveFromCart);
  } catch (err) {
    console.error(err);
    productGrid.innerHTML =
      "<p class='text-red-500 text-center'>Failed to load products</p>";
  }
}

function handleAddToCart(product) {
  addToCart(product);
  renderCart(cartList, handleRemoveFromCart);
}

function handleRemoveFromCart(productId) {
  removeFromCart(productId);
  renderCart(cartList, handleRemoveFromCart);
}

init();
