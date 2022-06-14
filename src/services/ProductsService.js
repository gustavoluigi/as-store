/* eslint-disable max-len */
// import HttpClient from './utils/HttpClient';
import HttpClient from './utils/HttpClientNew';

class ProductsService {
  async listProducts() {
    const response = await HttpClient.get('/products').then((res) => res);
    const productsList = response.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      size: item.size,
      color: item.color,
      brand: item.brand,
      desc: item.desc,
      storage: item.storage,
      ref: item.ref,
      sku: item.sku,
    }));
    return productsList;
  }

  async getProduct(productId) {
    const response = await HttpClient.get(`/products/${productId}`).then((res) => res);
    return response;
  }

  async createProduct(product) {
    const response = await HttpClient.post('/products', product).then((res) => res);
    return response;
  }

  async editProduct(productId, product) {
    const response = await HttpClient.patch(`/products/${productId}`, product).then((res) => res);
    return response;
  }

  async deleteProduct(productId) {
    const response = await HttpClient.delete(`/products/${productId}`).then((res) => res);
    return response;
  }

  async decreaseProductQt(productId, qt = 1) {
    const product = await HttpClient.get(`/products/${productId}`).then((res) => res);
    const response = await HttpClient.patch(`/products/${productId}`, { storage: product.storage - qt });
    return response;
  }

  async increaseProductQt(productId, qt = 1) {
    const product = await HttpClient.get(`/products/${productId}`).then((res) => res);
    const response = await HttpClient.patch(`/products/${productId}`, { storage: product.storage + qt });
    return response;
  }

  async updateProductQt(productId, newQt) {
    const response = await HttpClient.patch(`/products/${productId}`, { storage: newQt });
    return response;
  }
}

export default new ProductsService();
