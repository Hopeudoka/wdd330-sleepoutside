import ProductData from './ProductData.mjs';

async function loadProducts() {
    const dataSource = new ProductData('tents');
    const products = await dataSource.getData();
    const productList = document.getElementById('product-list');

    productList.innerHTML = products.map(product => `
        <li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
                <img src="${product.Image}" alt="${product.Name}">
                <h3 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
            </a>
        </li>
    `).join('');
}

loadProducts();
