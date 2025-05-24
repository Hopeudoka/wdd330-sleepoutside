import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();

const product = new ProductDetails(productId, dataSource);
loadHeaderFooter();
product.init();
