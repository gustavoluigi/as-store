import HttpClient from './utils/HttpClient';

class CustomersService {
  async listCustomers() {
    const response = await HttpClient.get('/customers').then((res) => res);
    return response;
  }

  async getCustomer(customerId) {
    const response = await HttpClient.get(`/customers/${customerId}`).then((res) => res);
    return response;
  }

  async createCustomer(customer) {
    const response = await HttpClient.post('/customers', customer).then((res) => res);
    return response;
  }

  async deleteCustomer(customerId) {
    const response = await HttpClient.post('/customers', customerId).then((res) => res);
    return response;
  }
}

export default new CustomersService();
