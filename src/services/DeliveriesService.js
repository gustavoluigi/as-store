/* eslint-disable no-param-reassign */
import HttpClient from './utils/HttpClientNew';

class DeliveriesService {
  async listDeliveries() {
    const response = await HttpClient.get('/deliveries');
    const DeliveriesList = response.map((item) => ({
      id: item.id,
      dateInit: item.dateInit,
      dateEnd: item.dateEnd,
      qtProducts: item.qtProducts,
      customerId: item.customerId,
    }));
    return DeliveriesList;
  }

  async listDeliveriesWithCustomer() {
    const response = await HttpClient.get('/deliveries?_expand=customer');
    response.map((item) => {
      delete item.customerId;
      return item;
    });
    return response;
  }

  async listDeliveriesWithProducts() {
    const response = await HttpClient.get('/deliveries?_embed=delivery_products').then((res) => res);
    response.map((item) => {
      delete item.customerId;
      return item;
    });
    return response;
  }

  async listDeliveriesWithProductsAndCustomer() {
    const response = await HttpClient.get('/Deliveries?_embed=delivery_products&_expand=customer').then((res) => res);
    response.map((item) => {
      delete item.customerId;
      return item;
    });
    return response;
  }

  async getDelivery(deliveryId) {
    const response = await HttpClient.get(`/deliveries/${deliveryId}`).then((res) => res);
    return response;
  }

  async getDeliveryWithCustomer(deliveryId) {
    const response = await HttpClient.get(`/deliveries/${deliveryId}?_expand=customer`).then((res) => res);
    return response;
  }

  async getDeliveryWithProducts(deliveryId) {
    const response = await HttpClient.get(`/deliveries/${deliveryId}?_embed=delivery_products`).then((res) => res);
    return response;
  }

  async getDeliveryWithProductsAndCustomer(deliveryId) {
    const response = await HttpClient.get(`/deliveries/${deliveryId}?_embed=delivery_products&_expand=customer`).then(
      (res) => res,
    );
    const productsDelivery = await HttpClient.get(`delivery_products?_expand=product&deliveryId=${deliveryId}`).then(
      (res) => res,
    );

    const newProductsDeliveryList = response.delivery_products.map((item, index) => {
      const { product } = productsDelivery[index];
      return Object.assign(item, product);
    });
    response.delivery_products = newProductsDeliveryList;
    return response;
  }
}

export default new DeliveriesService();
