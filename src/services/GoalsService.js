/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import HttpClient from './utils/HttpClientNew';

class GoalsService {
  async listGoals() {
    const response = await HttpClient.get('/goals');
    return response;
  }

  async listGoalsAndOrders() {
    const goals = await HttpClient.get('/goals');

    const newGoals = await Promise.all(goals.map(async (i) => {
      const ordersFromMonth = await HttpClient.get(`/orders?date_like=${i.year}-${i.month}&_expand=customer`);
      Object.assign(i, { orders: ordersFromMonth });
      return i;
    }));

    return newGoals;
  }

  async getCurrentGoalsAndOrders() {
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    const currentYear = new Date().getFullYear();

    const stats = await HttpClient.get(`/goals?month=${currentMonth}`);
    const orders = await HttpClient.get(`/orders?date_like=${currentYear}-${currentMonth}&_expand=customer`);

    const response = {
      stats,
      orders,
    };
    // const goals = await HttpClient.get(`/goals?month=${currentMonth}&year=${currentYear}`);
    // // console.log(goals);

    // const currentMonthOrders = await HttpClient.get(`/orders?date_like=${currentYear}-${currentMonth}&_expand=customer`);

    // const response = {
    //   goals,
    //   currentMonthOrders,
    // };
    // return response;

    return response;
  }

  async createGoal(goal) {
    const findGoal = await HttpClient.get(`/goals?month=${goal.month}&year=${goal.year}`);
    const response = new Promise((resolve, reject) => {
      const validMonth = goal.month > 0 && goal.month < 13;
      if (findGoal.length === 0 && validMonth) {
        const postResponse = HttpClient.post('/goals', goal);
        resolve(postResponse);
      } else if (!validMonth) {
        const json = { msg: 'Digite um mês válido' };
        reject(json);
      } else {
        const json = { msg: 'Já existe uma meta criada para esse mês!' };
        reject(json);
      }
    });

    return response;
  }
}

export default new GoalsService();
