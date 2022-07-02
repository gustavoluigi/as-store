import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { useDebounce } from '../../../hooks/useDebounce';
import CustomersService from '../../../services/CustomersService';
import { AddIcon, Button } from './styles';

function Customers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearch = useDebounce(searchTerm, 500);
  const tableHeads = ['Nome', 'Telefone', 'Endereço', 'CEP'];

  const {
    data: customers,
    error,
    isError,
    isLoading,
  } = useQuery(['customers', { debounceSearch }], () => CustomersService.listCustomers(debounceSearch));

  const handleTableClick = (customerId) => {
    navigate(`../${customerId}`);
  };

  const handleAddClick = () => {
    navigate('../criar');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Novo cliente
      </Button>
      <PageTitle>Clientes</PageTitle>

      <Wrapper>
        <Input
          label="Pesquisar"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Pesquise pelo nome do cliente:"
        />
        {isLoading && <div>Aguarde...</div>}
        {isError && <div>Erro! {error.message}</div>}
        {!isLoading && !isError && (
          <Table tableHeads={tableHeads} tableRows={customers} handleClick={handleTableClick} />
        )}
      </Wrapper>
    </>
  );
}

export default Customers;
