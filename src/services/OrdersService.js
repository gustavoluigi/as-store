import HttpClient from './utils/HttpClient';

class OrdersService {
  async listOrders() {
    const response = await HttpClient.get('/orders').then((res) => res);
    return response;
  }

  async getOrder(orderId) {
    const response = await HttpClient.get(`/orders/${orderId}`).then((res) => res);
    return response;
  }

  async createOrder(order) {
    const response = await HttpClient.post('/orders', order).then((res) => res);
    return response;
  }

  async deleteOrder(orderId) {
    const response = await HttpClient.post('/orders', orderId).then((res) => res);
    return response;
  }
}

export default new OrdersService();
