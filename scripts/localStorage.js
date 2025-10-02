const STORAGE_KEY = "cart";

export function getCart() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
}

export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
}
