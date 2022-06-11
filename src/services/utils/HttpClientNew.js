import axios from 'axios';

const client = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  baseURL: 'http://localhost:3001/api',
});

class HttpClientNew {
  async get(path) {
    const response = await client
      .get(path)
      .then((res) => res.data)
      .catch((err) => ({
        status: err.response.status,
        msg: 'Ocorreu um erro na sua solicitação',
      }));
    return response;
  }

  async post(path, body) {
    const response = await client
      .post(path, body)
      .then((res) => res.data)
      .catch((err) => ({
        status: err.response.status,
        msg: 'Ocorreu um erro na sua solicitação',
      }));
    return response;
  }
}

export default new HttpClientNew();
