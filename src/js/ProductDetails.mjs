import { getLocalStorage, setLocalStorage } from "./utils.mjs";


export default class ProductDetail {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));

    }
    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }
    renderProductDetails() {
        renderProductDetails(this.product);
    }
}
function renderProductDetails(product) {
    document.querySelector(".product-detail h2").textContent = product.Brand.Name;
    document.querySelector(".product-detail h3").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector(".product-detail img");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.querySelector(".product-card__price").textContent = product.FinalPrice;
    document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
    document.querySelector(".product__description").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
}