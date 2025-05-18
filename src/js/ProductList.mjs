function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand?.Name || "Unknown Brand"}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(productCategory, dataSource, listElement) {
    this.productCategory = productCategory;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // the dataSource will return a Promise...
    const list = await this.dataSource.getData();
    // next, render the list – ** future **
    const productList = document.getElementById(this.listElement);
    productList.innerHTML = list
      .map((product) => productCardTemplate(product))
      .join("");
  }
}
