import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';
import CustomersService from '../../../services/CustomersService';
import formatPhone from '../../../utils/formatPhone';
import { AddIcon, Button } from './styles';

function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState();
  const tableHeads = ['ID', 'Nome', 'Telefone', 'Endereço', 'CEP'];

  const getCustomers = async () => {
    const customersList = await CustomersService.listCustomers().then((res) => res.map((i) => ({
      ...i,
      phone: formatPhone(i.phone),
    })));
    setCustomers(customersList);
  };

  const handleTableClick = (customerId) => {
    navigate(`../clientes/${customerId}`, { replace: true });
  };

  const handleAddClick = () => {
    navigate('../clientes/criar', { replace: true });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <Private>
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
    </Private>
  );
}

export default Customers;
