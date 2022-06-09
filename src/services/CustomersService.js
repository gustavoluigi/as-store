import HttpClient from './utils/HttpClient';

class CustomersService {
  async listCustomers() {
    const { data: response } = await HttpClient.get('/customers').then((res) => res);
    return response;
  }

  async getCustomer(customerId) {
    const { data: response } = await HttpClient.get(`/customers/${customerId}`).then((res) => res);
    return response;
  }

  async createCustomer(customer) {
    const { data: response } = await HttpClient.post('/customers', customer).then((res) => res);
    return response;
  }

  async editCustomer(customerId, customer) {
    const { data: response } = await HttpClient.patch(`/customers/${customerId}`, customer).then((res) => res);
    return response;
  }

  async deleteCustomer(customerId) {
    const { data: response } = await HttpClient.delete(`/customers/${customerId}`).then((res) => res);
    return response;
  }
}

export default new CustomersService();
