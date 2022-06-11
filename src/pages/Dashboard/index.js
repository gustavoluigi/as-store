/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import {
  Cell, Pie, PieChart, ResponsiveContainer, Tooltip,
} from 'recharts';
import CustomTooltip from '../../components/Charts/CustomTooltip';
import { Wrapper } from '../../components/Layout/Wrapper';
import PageTitle from '../../components/PageTitle';
import Private from '../../layout/Private';
import GoalsService from '../../services/GoalsService';
import { formatPrice } from '../../utils';
import { ChartBox } from './styles';

function Dashboard() {
  const [chartDataMeta, setChartDataMeta] = useState([
    { name: 'Meta', value: 0 },
    { name: 'Total ', value: 100000 },
  ]);
  const [ordersCount, setOrdersCount] = useState();

  const loadStats = async () => {
    const monthReq = await GoalsService.getCurrentGoalsAndOrders();
    const monthStats = monthReq.stats[0];
    const totalValue = monthReq.orders.reduce((acc, obj) => acc + obj.total, 0);

    setOrdersCount(monthReq.orders.length);

    setChartDataMeta([
      { name: 'Meta', value: monthStats.goal },
      { name: 'Total vendido', value: totalValue },
    ]);
  };

  useEffect(() => {
    loadStats();
  }, []);
  const COLORS_META = ['#0088FE', '#00C49F'];
  return (
    <Private>
      <PageTitle>Dashboard</PageTitle>
      <Wrapper>
        <p>Meta do mês: {formatPrice(chartDataMeta[0].value)}</p>
        <p>Total de vendas até o momento: {ordersCount}</p>
        <p>Valor total de vendas até o momento: {formatPrice(chartDataMeta[1].value)}</p>
        {/* <ChartBox style={{ height: 500 }}> */}
        <ChartBox>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartDataMeta}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
              >
                {chartDataMeta.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS_META[index % COLORS_META.length]} />
                ))}
              </Pie>
              <Tooltip content={CustomTooltip} />

            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </Wrapper>
    </Private>
  );
}

export default Dashboard;
