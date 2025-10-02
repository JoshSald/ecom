import { addToCart, getCart } from "./localStorage.js";

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

  const price = document.createElement("p");
  price.textContent = `$${product.price}`;
  price.className = "text-green-600 font-bold mb-4";

  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.className =
    "mt-auto bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded";
  button.addEventListener("click", () => onAddToCart(product));

  card.append(img, title, price, button);
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
  const checkout = document.querySelector("#checkout");
  if (cart.length > 0) {
    checkout.classList.remove("hidden");
  } else {
    checkout.classList.add("hidden");
  }

  container.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "border p-2 rounded bg-gray-50 flex justify-between items-center";

    const text = document.createElement("span");
    text.textContent = `${item.title} - $${item.price}`;

    const button = document.createElement("button");
    button.textContent = "Remove";
    button.className =
      "ml-4 bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded text-sm";
    button.addEventListener("click", () => onRemove(item.id));

    li.append(text, button);
    container.appendChild(li);
  });
  checkout.addEventListener("click", () => {
    alert("Sorry. It was just too good to be true.");
  });
}
