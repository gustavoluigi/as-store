/* eslint-disable no-param-reassign */
import HttpClient from './utils/HttpClient';

class OrdersService {
  async listOrders() {
    const { data: response } = await HttpClient.get('/orders').then((res) => res);
    const orderList = response.map((item) => ({
      id: item.id,
      date: item.date,
      qt_products: item.qt_products,
      subtotal: item.subtotal,
      discount: item.discount,
      total: item.total,
      obs: item.obs,
      transaction: item.transaction,
    }));
    return orderList;
  }

  async listOrdersWithCustomer() {
    const { data: response } = await HttpClient.get('/orders?_expand=customer').then((res) => res);
    response.map((item) => {
      delete item.customerId;
      return item;
    });
    // console.log(response);
    return response;
  }

  async listOrdersWithProducts() {
    const { data: response } = await HttpClient.get('/orders?_embed=order_products').then((res) => res);
    response.map((item) => {
      delete item.customerId;
      return item;
    });
    return response;
  }

  async listOrdersWithProductsAndCustomer() {
    const { data: response } = await HttpClient.get('/orders?_embed=order_products&_expand=customer').then(
      (res) => res,
    );
    response.map((item) => {
      delete item.customerId;
      return item;
    });
    return response;
  }

  async getOrder(orderId) {
    const { data: response } = await HttpClient.get(`/orders/${orderId}`).then((res) => res);
    return response;
  }

  async getOrderWithCustomer(orderId) {
    const { data: response } = await HttpClient.get(`/orders/${orderId}?_expand=customer`).then((res) => res);
    return response;
  }

  async getOrderWithProducts(orderId) {
    const { data: response } = await HttpClient.get(`/orders/${orderId}?_embed=order_products`).then((res) => res);
    return response;
  }

  async getOrderWithProductsAndCustomer(orderId) {
    const { data: response } = await HttpClient.get(`/orders/${orderId}?_embed=order_products&_expand=customer`).then(
      (res) => res,
    );
    const { data: productsOrder } = await HttpClient.get(`order_products?_expand=product&orderId=${orderId}`).then(
      (res) => res,
    );

    const newProductsOrderList = response.order_products.map((item, index) => {
      const { product } = productsOrder[index];
      return Object.assign(item, product);
    });
    response.order_products = newProductsOrderList;
    return response;
  }

  async createOrder(order, products) {
    const { data: response } = await HttpClient.post('/orders', order).then((res) => res);

    const orderProducts = products.map((e) => ({ orderId: response.id, ...e }));

    orderProducts.map(async (e) => {
      await HttpClient.post('/order_products', e).then(async (res) => {
        const qt = await HttpClient.get(`/products/${res.data.productId}`);
        await HttpClient.patch(`/products/${e.productId}`, { storage: qt.data.storage - res.data.quantity });
      });
    });

    return response;
  }

  async deleteOrder(orderId) {
    const response = await HttpClient.delete('/orders', orderId).then((res) => res);
    return response;
  }
}

export default new OrdersService();
