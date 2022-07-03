import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import GoalsService from '../../../services/GoalsService';
import { triggerToast, Toast } from '../../../utils';
import { Button } from './styles';

function CreateGoal() {
  const navigate = useNavigate();
  const [goalData, setGoalData] = useState({
    month: null,
    year: null,
    goal: null,
  });

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

  const { mutate: addGoal } = useMutation(GoalsService.createGoal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    addGoal(goalData, {
      onSuccess: (data) => {
        triggerToast('success', 'Meta criada com sucesso');
        // setTimeout(() => {
        //   navigate('/metas');
        // }, 2000);
      },
      onError: (error) => {
        triggerToast('error', error.message);
      },
    });
    // await GoalsService.createGoal({ goal, month, year })
    //   .then((res) => {
    //     if (res.msg) {
    //       triggerToast('error', res.msg);
    //     } else {
    //       triggerToast('success', 'Meta criada com sucesso!');
    //     }
    //   })
    //   .catch((err) => triggerToast('error', err.msg));
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
