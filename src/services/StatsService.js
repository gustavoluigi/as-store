import HttpClient from './utils/HttpClient';

class StatsService {
  async getMonthStats(year, month) {
    const { data: stats } = await HttpClient.get(`/month_stats?month=${month}`);
    const { data: orders } = await HttpClient.get(`/orders?date_like=${year}-${month}&_expand=customer`);

    const response = {
      stats,
      orders,
    };

    return response;
  }
}

export default new StatsService();
