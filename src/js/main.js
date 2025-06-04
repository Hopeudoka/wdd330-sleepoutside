import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, loadCategories } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const productList = new ProductList("tents", dataSource, "product-list");
productList.init();
loadHeaderFooter();

fetch("/json/categories.json")
  .then((response) => response.json())
  .then((categories) => {
    const parentElement = document.querySelector(".categories");
    loadCategories(categories, parentElement);
  })
  .catch((error) => console.error("Error loading category data:", error));
