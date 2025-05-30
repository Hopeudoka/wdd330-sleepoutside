// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${response.status}`);
  }
  const template = await response.text();
  return template;
}
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerElement = qs("#header");
  const footerElement = qs("#footer");
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();
}

export function loadCategories(categories, parentElement) {
  const categoriesTemplate = `
    <div class="categories-flex">
      ${categories
        .map(
          (category) => `
          <a href="${category.url}">
            <img src="${category.icon}" alt="${category.category}" />
            <span>${category.category}</span>
          </a>
        `,
        )
        .join("")}
    </div>
  `;
  renderWithTemplate(categoriesTemplate, parentElement);
}
function updateCartCount()
{
  const htmls = getLocalStorage("so-cart") || [];
  const cartCount = htmls.reduce((count, item) => count + (item.quantity || 1), 0);
  const cartElement = qs(".cart-count")
  if(cartCount > 0)
  {
    cartElement.style.display = "block";
    cartElement.textContent = cartCount;
  }
}