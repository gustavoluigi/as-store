/* eslint-disable no-param-reassign */
import HttpClient from './utils/HttpClient';

class GoalsService {
  async listGoals() {
    const { data: response } = await HttpClient.get('/goals');
    return response;
  }
}

export default new GoalsService();
