import HttpClient from './utils/HttpClient';

class ProductsService {
  async listProducts() {
    const response = await HttpClient.get('/products').then((res) => res);
    return response;
  }

  async getProduct(productId) {
    const response = await HttpClient.get(`/products/${productId}`).then((res) => res);
    return response;
  }

  async createProduct(product) {
    const response = await HttpClient.post('/products', product).then((res) => res);
    return response;
  }

  async deleteProduct(productId) {
    const response = await HttpClient.post('/products', productId).then((res) => res);
    return response;
  }
}

export default new ProductsService();
