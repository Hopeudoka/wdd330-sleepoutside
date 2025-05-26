import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ProductData();
const productElement = document.querySelector(".product-detail");

const productDetails = new ProductDetails(
  productId,
  dataSource,
  productElement,
);
productDetails.init();
