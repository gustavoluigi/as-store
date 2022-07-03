/* eslint-disable max-len */
// import HttpClient from './utils/HttpClient';
import HttpClient from './utils/HttpClientNew';
import { supabase } from './utils/supabaseClient';

class ProductsService {
  async listProducts() {
    const { data: products, error } = await supabase
      .from('products')
      .select(`*,
      brands(
        name
      )`);

    const formatedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      desc: product.desc,
      brand: product.brands.name,
    }));

    console.log(formatedProducts);

    if (error) throw error;

    return formatedProducts;
  }

  async getProduct(productId) {
    const response = await HttpClient.get(`/products/${productId}`).then((res) => res);
    return response;
  }

  async createProduct(product) {
    const newProduct = {
      name: product.name,
      price: product.price,
      desc: product.desc,
      brand_id: product.brand_id,
    };

    const { data: productCreated, error: errorProduct } = await supabase
      .from('products')
      .insert(newProduct);

    if (errorProduct) throw errorProduct;

    const newProductVariation = {
      product_id: productCreated[0].id,
      color_id: product.color_id,
      size_id: product.size_id,
      storage: product.storage,
      ref: product.ref,
      sku: product.sku,
    };

    const { data, error } = await supabase
      .from('product_variations')
      .insert(newProductVariation);

    if (error) throw error;

    return data;
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
