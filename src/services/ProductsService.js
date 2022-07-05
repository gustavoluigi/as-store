/* eslint-disable max-len */
// import HttpClient from './utils/HttpClient';
import HttpClient from './utils/HttpClientNew';
import { supabase } from './utils/supabaseClient';

class ProductsService {
  async listProducts(searchTerm = null) {
    const { data: products, error } = await supabase
      .from('products')
      .select(`*,
      brands(
        name
      )`)
      .ilike('name', `%${searchTerm || ''}%`)
      .order('name', { ascending: true });

    const formatedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      desc: product.desc,
      brand: product.brands.name,
    }));

    if (error) throw error;

    return formatedProducts;
  }

  async getProduct(productId) {
    const { data: product, error } = await supabase
      .from('products')
      .select(`*,
      brands(
        name
        )`)
      .eq('id', productId)
      .single();

    if (error) throw error;

    return product;
  }

  async getVariations(productId) {
    const { data: variations, error } = await supabase
      .from('product_variations')
      .select(`*,
      colors(
        name
      ),
      sizes(
        name
      )`)
      .eq('product_id', productId);

    if (error) throw error;

    const formatedVariations = variations.map((variation) => ({
      id: variation.id,
      size: variation.sizes.name,
      color: variation.colors.name,
      storage: variation.storage,
      ref: variation.ref,
      sku: variation.sku,
    }));

    return formatedVariations;
  }

  async getVariation(productId) {
    const { data: productvariation, error } = await supabase
      .from('product_variations')
      .select(`*,
      colors(
        name
      ),
      sizes(
        name
      ),
      products(
        name
        )`)
      .eq('id', productId);

    if (error) throw error;

    const formatedVariation = productvariation.map((variation) => ({
      id: variation.id,
      size: {
        value: variation.size_id,
        label: variation.sizes.name,
      },
      color: {
        value: variation.color_id,
        label: variation.colors.name,
      },
      storage: variation.storage,
      ref: variation.ref,
      sku: variation.sku,
      name: variation.products.name,
    }));

    return formatedVariation[0];
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

    // const newProductVariation = {
    //   product_id: productCreated[0].id,
    //   color_id: product.color_id,
    //   size_id: product.size_id,
    //   storage: product.storage,
    //   ref: product.ref,
    //   sku: product.sku,
    // };

    // const { data, error } = await supabase
    //   .from('product_variations')
    //   .insert(newProductVariation);

    if (errorProduct) throw errorProduct;

    return productCreated;
  }

  async createVariation(productVariation) {
    const { data, error } = await supabase
      .from('product_variations')
      .insert(productVariation);

    if (error) throw error;

    return data;
  }

  async editProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .select(`*,
      brands(
        name
        )`)
      .eq('id', product.id)
      .single();

    if (error) throw error;

    return data;
  }

  async editVariation(product) {
    const { data: productvariation, error } = await supabase
      .from('product_variations')
      .update(product)
      .select(`*,
      colors(
        name
      ),
      sizes(
        name
      ),
      products(
        name
        )`)
      .eq('id', product.id);

    if (error) throw error;

    const formatedVariation = productvariation.map((variation) => ({
      id: variation.id,
      size: {
        value: variation.size_id,
        label: variation.sizes.name,
      },
      color: {
        value: variation.color_id,
        label: variation.colors.name,
      },
      storage: variation.storage,
      ref: variation.ref,
      sku: variation.sku,
      name: variation.products.name,
    }));

    return formatedVariation[0];
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
