import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const cartFooter = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {

    const total = cartItems.reduce(
      (sum, item) => sum + (item.FinalPrice * (item.quantity || 1)),
      0
    );
    cartFooter.classList.remove("hide");
    cartFooter.querySelector(
      ".cart-total"
    ).textContent = `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img src="${item.Image}" alt="${item.Name}">
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color available"}</p>
        <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
        <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
    </li>`;
}

renderCartContents();
