export default class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = document.querySelector(".product-list");
  }

  async init() {
    const products = await this.dataSource.getData(this.category);
    this.render(products);
  }

  render(products) {
    this.element.innerHTML = products
      .map(
        (product) => `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
        `,
      )
      .join("");
  }
}
