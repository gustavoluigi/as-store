/* eslint-disable max-len */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import Input from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import { Wrapper } from '../../components/Layout/Wrapper';
import PageTitle from '../../components/PageTitle';

const Button = styled.button`
  ${tw`relative transition inline-flex w-full mt-3 mb-5 ml-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
`;

function Reports() {
  const reportsOptions = [
    {
      key: 'relatorio-mensal',
      value: 'relatorio-mensal',
      label: 'Vendas por mês',
    },
  ];
  const [reportType, setReportType] = useState();
  const [date, setDate] = useState();
  return (
    <>
      <PageTitle>Relatórios</PageTitle>
      <Wrapper>
        <Select label="Tipo de relatório" options={reportsOptions} onChange={(e) => setReportType(e.target.value)} />
        {reportType === 'relatorio-mensal' && (
        <Input
          label="Data"
          id="date"
          name="date"
          type="month"
          value={date || ''}
          onChange={(e) => setDate(e.target.value)}
        />
        )}

        {date && (
          <Link to={`/${reportType}/${date.split('-')[1]}/${date.split('-')[0]}`} target="_blank">
            <Button type="button">Gerar ralatório</Button>
          </Link>
        )}
      </Wrapper>
    </>
  );
}

export default Reports;
