import { useState } from 'react';
import Input from '../../../components/Form/Input';
import { Wrapper } from '../../../components/Layout/Wrapper';

import PageTitle from '../../../components/PageTitle';

import Private from '../../../layout/Private/index';
import GoalsService from '../../../services/GoalsService';
import { triggerToast, Toast } from '../../../utils';
import { Button } from './styles';

function CreateGoal() {
  const [month, setMonth] = useState();
  const [year, setYear] = useState('2022');
  const [goal, setGoal] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await GoalsService.createGoal({ goal, month, year })
      .then((res) => {
        if (res.msg) {
          triggerToast('error', res.msg);
        } else {
          triggerToast('success', 'Meta criada com sucesso!');
        }
      })
      .catch((err) => triggerToast('error', err.msg));
  };
  return (
    <Private>
      <Toast />
      <PageTitle>Nova meta</PageTitle>
      <Wrapper>
        <Input
          label="Mês"
          id="month"
          name="month"
          type="text"
          value={month || ''}
          onChange={(e) => setMonth(e.target.value)}
        />
        <Input
          label="Ano"
          id="year"
          name="year"
          type="text"
          value={year || ''}
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          label="Meta"
          id="goal"
          name="goal"
          type="number"
          value={goal || ''}
          onChange={(e) => setGoal(parseInt(e.target.value, 10))}
        />
        <Button type="submit" onClick={handleSubmit}>
          Criar meta
        </Button>
      </Wrapper>
    </Private>
  );
}

export default CreateGoal;
