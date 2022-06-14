import axios from 'axios';

const client = axios.create({
  // baseURL: process.env.REACT_APP_URL,
  baseURL: process.env.REACT_APP_API_URL,
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

  async patch(path, body) {
    const response = await client
      .patch(path, body)
      .then((res) => res.data)
      .catch((err) => ({
        status: err.response.status,
        msg: 'Ocorreu um erro na sua solicitação',
      }));
    return response;
  }

  async put(path, body) {
    const response = await client
      .put(path, body)
      .then((res) => res.data)
      .catch((err) => ({
        status: err.response.status,
        msg: 'Ocorreu um erro na sua solicitação',
      }));
    return response;
  }

  async delete(path) {
    const response = await client
      .delete(path)
      .then((res) => res.data)
      .catch((err) => ({
        status: err.response.status,
        msg: 'Ocorreu um erro na sua solicitação',
      }));
    return response;
  }
}

export default new HttpClientNew();
