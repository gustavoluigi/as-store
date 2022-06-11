import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import { Wrapper } from '../../../components/Layout/Wrapper';
import Private from '../../../layout/Private';
import { AddIcon, Button } from './styles';
import GoalsService from '../../../services/GoalsService';
import Table from '../../../components/Table';
import { capitilize, formatPrice } from '../../../utils';

function Goals() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState();
  const tableHeads = ['ID', 'Meta', 'Data'];

  const loadGeals = async () => {
    const goalsList = await GoalsService.listGoals();
    const filteredGoalsList = goalsList.map((i) => ({
      id: i.id,
      goal: formatPrice(i.goal),
      date: `${capitilize(new Date(i.month).toLocaleString('default', { month: 'long' }))} de ${i.year}`,
    }));
    setGoals(filteredGoalsList);
  };

  useEffect(() => {
    loadGeals();
  }, []);

  const handleAddClick = () => {
    navigate('../metas/criar', { replace: true });
  };
  return (
    <Private>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Nova meta
      </Button>
      <PageTitle>Metas</PageTitle>
      <Wrapper>
        <Table tableRows={goals} tableHeads={tableHeads} hasSearch searchField="date" />
      </Wrapper>
    </Private>
  );
}

export default Goals;
