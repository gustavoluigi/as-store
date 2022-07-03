/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import HttpClient from './utils/HttpClientNew';
import { supabase } from './utils/supabaseClient';

class GoalsService {
  async listGoals() {
    const { data: goals, error } = await supabase
      .from('goals')
      .select('*');
    if (error) throw error;
    return goals;
  }

  async listGoalsAndOrders(selectedMonth = 0) {
    const parserSelectedMonth = parseInt(selectedMonth, 10);
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('total, date');

    if (ordersError) throw ordersError;

    let queryGoals = supabase
      .from('goals')
      .select('*');

    if (parserSelectedMonth !== 0) { queryGoals = queryGoals.eq('month', parserSelectedMonth); }

    const { data: goals, goalsError } = await queryGoals;
    if (goalsError) throw goalsError;

    return { orders, goals };
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

    return response;
  }

  async createGoal(goal) {
    const { data: goalExists, error: errorGoalExists } = await supabase
      .from('goals')
      .select('*')
      .eq('month', goal.month)
      .eq('year', goal.year)
      .single();

    if (errorGoalExists) throw errorGoalExists;

    if (goalExists) throw Object.assign(new Error('Já existe uma meta criada para esse mês'), { status: 409 });

    const { data, error } = await supabase
      .from('goals')
      .insert([goal]);

    if (error) throw error;
    return data;
    // const findGoal = await HttpClient.get(`/goals?month=${goal.month}&year=${goal.year}`);
    // const response = new Promise((resolve, reject) => {
    //   const validMonth = goal.month > 0 && goal.month < 13;
    //   if (findGoal.length === 0 && validMonth) {
    //     const postResponse = HttpClient.post('/goals', goal);
    //     resolve(postResponse);
    //   } else if (!validMonth) {
    //     const json = { msg: 'Digite um mês válido' };
    //     reject(json);
    //   } else {
    //     const json = { msg: 'Já existe uma meta criada para esse mês!' };
    //     reject(json);
    //   }
    // });

    // return response;
  }
}

export default new GoalsService();
