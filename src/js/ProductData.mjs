const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ProductData {
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await response.json();
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await response.json();
    return data.Result;
  }
}
