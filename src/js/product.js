import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetail from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");
const productDetail = ProductDetail(productId, dataSource);

productDetail.init();

