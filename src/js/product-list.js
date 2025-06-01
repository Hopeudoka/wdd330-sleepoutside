import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam, loadCategories } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productsTitle = document.querySelector(".products-title");
productsTitle.textContent = category;

const myList = new ProductList(category, dataSource, listElement);
myList.init();

fetch("/json/categories.json")
  .then((response) => response.json())
  .then((categories) => {
    const parentElement = document.querySelector(".categories");
    loadCategories(categories, parentElement);
  })
  .catch((error) => console.error("Error loading category data:", error));
