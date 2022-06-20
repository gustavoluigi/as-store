/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { capitilize, formatPrice } from '../../../utils';
import GoalsService from '../../../services/GoalsService';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import { Wrapper } from '../../../components/Layout/Wrapper';
import { AddIcon, Button } from './styles';

function Goals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState();
  const tableHeads = ['ID', 'Meta', 'Total vendido', 'Data'];

  const loadGeals = async () => {
    const goalsList = await GoalsService.listGoalsAndOrders();
    goalsList.sort(
      (a, b) => new Date(`${parseInt(a.year, 10)}/${parseInt(a.month, 10)}`)
        - new Date(`${parseInt(b.year, 10)}/${parseInt(b.month, 10)}`),
    );
    const filteredGoalsList = goalsList.map((i) => ({
      id: i.id,
      goal: formatPrice(i.goal),
      totalValue: formatPrice(i.orders.reduce((acc, obj) => acc + obj.total, 0)),
      date: `${capitilize(new Date(i.month).toLocaleString('default', { month: 'long' }))} de ${i.year}`,
    }));
    setGoals(filteredGoalsList);
  };

  useEffect(() => {
    loadGeals();
  }, []);

  const handleAddClick = () => {
    navigate('../criar');
  };
  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Nova meta
      </Button>
      <PageTitle>Metas</PageTitle>
      <Wrapper>
        <Table tableRows={goals} tableHeads={tableHeads} hasSearch searchField="date" />
      </Wrapper>
    </>
  );
}

export default Goals;
