import { addToCart, getCart } from "./localStorage.js";
const checkout = document.querySelector("#checkout");

export function createProductCard(product, onAddToCart) {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg shadow p-4 flex flex-col text-center";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.className = "h-40 object-contain mb-4";

  const title = document.createElement("h3");
  title.textContent = product.title;
  title.className = "font-semibold text-lg mb-2 line-clamp-2";

  const description = document.createElement("p");
  description.textContent = product.description;
  description.className = "mb-4 line-clamp-2";

  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  price.className = "text-green-600 font-bold mb-2";

  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.className =
    "mt-auto bg-emerald-900 hover:bg-green-500 text-white px-4 py-2 rounded cursor-pointer";
  button.addEventListener("click", () => onAddToCart(product));

  card.append(img, title, price, description, button);
  return card;
}

export function renderProducts(products, container, onAddToCart) {
  container.innerHTML = "";
  products.forEach((product) => {
    const card = createProductCard(product, onAddToCart);
    container.appendChild(card);
  });
}

export function renderCart(container, onRemove) {
  const cart = getCart();
  container.innerHTML = "";
  cartHelper(cart.length);
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "border p-2 rounded bg-gray-50 flex justify-between items-center";

    const text = document.createElement("span");
    text.textContent = `${item.title} - $${item.price}`;

    const button = document.createElement("button");
    button.textContent = "Remove";
    button.className =
      "ml-4 bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded text-sm cursor-pointer";
    button.addEventListener("click", () => onRemove(item.id));

    li.append(text, button);
    container.appendChild(li);
  });
}

function cartHelper(items) {
  const cart = document.querySelector("#cart");
  if (items > 0) {
    checkout.classList.remove("hidden");
    cart.classList.remove("hidden");
  } else {
    checkout.classList.add("hidden");
    cart.classList.add("hidden");
  }
}
checkout.addEventListener("click", () => {
  alert("Sorry. It was just too good to be true.");
});
