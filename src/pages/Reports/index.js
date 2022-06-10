/* eslint-disable max-len */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import Input from '../../components/Form/Input';
import { Wrapper } from '../../components/Layout/Wrapper';
import PageTitle from '../../components/PageTitle';
import Private from '../../layout/Private';

const Button = styled.button`
  ${tw`relative transition inline-flex w-full mt-3 mb-5 ml-auto justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
`;

function Reports() {
  const [date, setDate] = useState();
  return (
    <Private>
      <PageTitle>Relatórios</PageTitle>
      <Wrapper>
        <Input
          label="Data"
          id="date"
          name="date"
          type="month"
          value={date || ''}
          onChange={(e) => setDate(e.target.value)}
        />
        {date && (
          <Link to={`/relatorio-mensal/${date.split('-')[1]}/${date.split('-')[0]}`} target="_blank">
            <Button type="button">Gerar ralatório</Button>
          </Link>
        )}
      </Wrapper>
    </Private>
  );
}

export default Reports;
