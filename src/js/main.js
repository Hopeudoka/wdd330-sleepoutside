import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {
  loadHeaderFooter,
  renderWithTemplate,
  loadCategories,
} from "./utils.mjs";

const dataSource = new ProductData("tents");
const productList = new ProductList("tents", dataSource, "product-list");
productList.init();
loadHeaderFooter();
// Load categories from JSON file and render them
fetch("/json/categories.json")
  .then((response) => response.json())
  .then((categories) => {
    const parentElement = document.querySelector(".categories");
    loadCategories(categories, parentElement);
  })
  .catch((error) => console.error("Error loading category data:", error));
