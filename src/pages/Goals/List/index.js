/* eslint-disable max-len */
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { capitilize, formatPrice } from '../../../utils';
import GoalsService from '../../../services/GoalsService';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import { Wrapper } from '../../../components/Layout/Wrapper';
import { AddIcon, Button } from './styles';
import Select from '../../../components/Form/Select';
import { useGetGoals } from '../../../hooks/useGoals';

function Goals() {
  const navigate = useNavigate();
  const tableHeads = ['Meta', 'Total vendido', 'Data'];
  const [selectedMonth, setSelectMonth] = useState();
  const months = [
    { key: 0, value: 0, label: 'Todos' },
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

  const {
    goals, error, isError, isLoading,
  } = useGetGoals(selectedMonth);

  const handleAddClick = () => {
    navigate('../criar');
  };

  const handleChange = (event) => {
    setSelectMonth(event.target.value);
  };

  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Nova meta
      </Button>
      <PageTitle>Metas</PageTitle>
      <Wrapper>
        <Select label="Mês" options={months} onChange={(event) => handleChange(event)} />
        {isLoading && (<div>Aguarde...</div>)}
        {isError && (<div>Erro! {error.message}</div>)}
        {(!isLoading && !isError)
        && (<Table tableRows={goals} tableHeads={tableHeads} />)}
      </Wrapper>
    </>
  );
}

export default Goals;
