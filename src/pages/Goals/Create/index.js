import { useState } from 'react';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import { useCreateGoal } from '../../../hooks/useGoals';
import { Toast } from '../../../utils';
import { Button } from './styles';

function CreateGoal() {
  const [goalData, setGoalData] = useState({
    month: null,
    year: null,
    goal: null,
  });
  const { handleCreate } = useCreateGoal(goalData);

  const months = [
    { key: 1, value: 1, label: 'Janeiro' },
    { key: 2, value: 2, label: 'Fevereiro' },
    { key: 3, value: 3, label: 'Março' },
    { key: 4, value: 4, label: 'Abril' },
    { key: 5, value: 5, label: 'Maio' },
    { key: 6, value: 6, label: 'Junho' },
    { key: 7, value: 7, label: 'Julho' },
    { key: 8, value: 8, label: 'Agosto' },
    { key: 9, value: 9, label: 'Setembro' },
    { key: 10, value: 10, label: 'Outubro' },
    { key: 11, value: 11, label: 'Novembro' },
    { key: 12, value: 12, label: 'Dezembro' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreate();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGoalData({ ...goalData, [name]: value });
  };

  return (
    <>
      <Toast />
      <PageTitle>Nova meta</PageTitle>
      <Wrapper>
        <Select
          label="Mês"
          name="month"
          options={months}
          defaultValue={goalData.month || ''}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Ano"
          id="year"
          name="year"
          type="text"
          value={goalData.year || ''}
          onChange={(e) => handleChange(e)}
        />
        <Input
          label="Meta"
          id="goal"
          name="goal"
          type="number"
          value={goalData.goal || ''}
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit" onClick={handleSubmit}>
          Criar meta
        </Button>
      </Wrapper>
    </>
  );
}

export default CreateGoal;
