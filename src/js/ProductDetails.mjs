import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!this.product) {
      console.error("Product not found!");
      return;
    }

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];

    // Check if the item is already in the cart
    const existingItem = cartItems.find((item) => item.Id === this.product.Id);

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      this.product.quantity = 1; // Initialize quantity for new items
      cartItems.push(this.product);
    }

    setLocalStorage("so-cart", cartItems);
    alert(`${this.product.Name} added to cart!`);
  }

  renderProductDetails() {
    document.title = `Sleep Outside | ${this.product.Name}`;
    document.querySelector("#product-title").textContent = this.product.Name;
    document.querySelector("#product-brand").textContent =
      this.product.Brand?.Name || "Unknown Brand";
    document.querySelector("#product-image").src = this.product.Image;
    document.querySelector("#product-price").textContent =
      `$${this.product.FinalPrice.toFixed(2)}`;
    document.querySelector("#product-color").textContent =
      this.product.Colors?.[0]?.ColorName || "No color available";
    document.querySelector("#product-description").innerHTML =
      this.product.DescriptionHtmlSimple;
  }
}
