import HttpClient from './utils/HttpClient';

class ProductsService {
  async listProducts() {
    const { data: response } = await HttpClient.get('/products').then((res) => res);
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
    const { data: response } = await HttpClient.get(`/products/${productId}`).then((res) => res);
    return response;
  }

  async createProduct(product) {
    const { data: response } = await HttpClient.post('/products', product).then((res) => res);
    return response;
  }

  async editProduct(productId, product) {
    const { data: response } = await HttpClient.patch(`/products/${productId}`, product).then((res) => res);
    return response;
  }

  async deleteProduct(productId) {
    const { data: response } = await HttpClient.delete(`/products/${productId}`).then((res) => res);
    return response;
  }
}

export default new ProductsService();
