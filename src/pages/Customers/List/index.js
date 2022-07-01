import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import CustomersService from '../../../services/CustomersService';
import { formatPhone } from '../../../utils';
import { AddIcon, Button } from './styles';

function Customers() {
  const navigate = useNavigate();
  // const tableHeads = ['ID', 'Nome', 'Telefone', 'Endereço', 'CEP'];
  const tableHeads = ['Nome', 'Telefone', 'Endereço', 'CEP'];

  const {
    data: customers, error, isError, isLoading,
  } = useQuery('customers', CustomersService.listCustomers);

  if (isLoading) {
    return <div>Aguarde...</div>;
  }
  if (isError) {
    return <div>Erro! {error.message}</div>;
  }

  const handleTableClick = (customerId) => {
    navigate(`../${customerId}`);
  };

  const handleAddClick = () => {
    navigate('../criar');
  };

  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Novo cliente
      </Button>
      <PageTitle>Clientes</PageTitle>
      <Wrapper>
        <Table
          tableHeads={tableHeads}
          tableRows={customers}
          hasSearch
          handleClick={handleTableClick}
        />
      </Wrapper>
    </>
  );
}

export default Customers;
