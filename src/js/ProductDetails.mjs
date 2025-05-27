import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(id, dataSource, element) {
    this.id = id;
    this.dataSource = dataSource;
    this.element = element;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.id);

    if (!this.product) {
      console.error("Product not found!");
      return;
    }

    this.render(this.product);

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

  render(product) {
    this.element.innerHTML = `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
     <h2 class="divider">${product.NameWithoutBrand}</h2>
     <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}">
     <p class="product-card__price">$${product.FinalPrice}</p>
     <p class="product__color">${product.Colors[0].ColorName}</p>
     <p class="product__description">
     ${product.DescriptionHtmlSimple}
     </p>
     <div class="product-detail__add">
       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
     </div></section>`;
  }
}
