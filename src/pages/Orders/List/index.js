/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';
import { AddIcon, Button } from './styles';
import OrdersService from '../../../services/OrdersService';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const tableHeads = ['ID', 'Data', 'Qt. Produtos', 'Subtotal', 'Desconto', 'Total', 'Obs', 'Pagamento', 'Cliente'];

  const loadOrders = async () => {
    const ordersList = await OrdersService.listOrdersWithCustomer();
    ordersList.map((item) => {
      item.name = item.customer.name;
      delete item.customer;
      return item;
    });
    setOrders(ordersList);
  };

  const handleTableClick = (orderId) => {
    navigate(`../vendas/${orderId}`, { replace: true });
  };

  const handleAddClick = () => {
    navigate('../vendas/criar', { replace: true });
  };

  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <Private>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Nova venda
      </Button>
      <PageTitle>Vendas</PageTitle>
      <Wrapper>
        <Table tableHeads={tableHeads} tableRows={orders} hasSearch handleClick={handleTableClick} />
      </Wrapper>
    </Private>
  );
}

export default Orders;
