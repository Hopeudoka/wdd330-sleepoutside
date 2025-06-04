import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  const cartFooter = document.querySelector(".cart-footer");
  if (cartItems.length > 0) {
    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0,
    );
    cartFooter.classList.remove("hide");
    cartFooter.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
  } else {
    cartFooter.classList.add("hide");
  }
  addQuantityListeners();
}

function cartItemTemplate(item) {
  return `
    <li class="cart-card divider" data-id="${item.Id}">
        <a href="#" class="cart-card__image">
            <img src="${item.Images.PrimarySmall}" alt="${item.NameWithoutBrand}">
        </a>
        <a href="#">
            <h2 class="card__name">${item.NameWithoutBrand}</h2>
        </a>
        <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color available"}</p>
        <label class="cart-card__quantity">
          qty: 
          <input type="number" min="1" value="${item.quantity || 1}" class="cart-qty-input" data-id="${item.Id}">
        </label>
        <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
    </li>`;
}

function addQuantityListeners() {
  document.querySelectorAll(".cart-qty-input").forEach((input) => {
    input.addEventListener("change", (e) => {
      const newQty = parseInt(e.target.value, 10);
      const id = e.target.dataset.id;
      if (newQty < 1) return;

      let cartItems = getLocalStorage("so-cart") || [];
      const item = cartItems.find((i) => i.Id === id);
      if (item) {
        item.quantity = newQty;
        setLocalStorage("so-cart", cartItems);
        renderCartContents();
      }
    });
  });
}

renderCartContents();
