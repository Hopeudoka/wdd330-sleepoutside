import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ExternalServices();
const productElement = document.querySelector(".product-detail");

const productDetails = new ProductDetails(
  productId,
  dataSource,
  productElement,
);
productDetails.init();
