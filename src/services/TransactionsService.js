import HttpClient from './utils/HttpClient';

class TransactionsService {
  async listTransactions() {
    const response = await HttpClient.get('/transactions').then((res) => res);
    return response;
  }

  async getTransaction(transactionId) {
    const response = await HttpClient.get(`/transactions/${transactionId}`).then((res) => res);
    return response;
  }

  async createTransaction(transaction) {
    const response = await HttpClient.post('/transactions', transaction).then((res) => res);
    return response;
  }

  async deleteTransaction(transactionId) {
    const response = await HttpClient.post('/transactions', transactionId).then((res) => res);
    return response;
  }
}

export default new TransactionsService();
