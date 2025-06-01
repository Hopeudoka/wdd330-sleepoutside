import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.querySelector('input[name="zip"]').addEventListener("blur", (e) => {
  if (e.target.value.trim() !== "") {
    checkout.calculateOrderTotal();
  } else {
    document.querySelector(".order-summary #summary-tax").textContent = "$0.00";
    document.querySelector(".order-summary #summary-shipping").textContent =
      "$0.00";
    document.querySelector(".order-summary #summary-total").textContent =
      "$0.00";
  }
});

document
  .getElementById("checkout-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!checkout.orderTotal || checkout.orderTotal === 0) {
      alert(
        "Please fill in your zip code to calculate totals before submitting.",
      );
      return;
    }
    await checkout.checkout(e.target);
  });
loadHeaderFooter();
