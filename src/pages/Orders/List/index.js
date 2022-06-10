/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';
import { AddIcon, Button } from './styles';
import OrdersService from '../../../services/OrdersService';
import formatDate from '../../../utils/formatDate';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const tableHeads = ['ID', 'Data', 'Qt. Produtos', 'Subtotal', 'Desconto', 'Total', 'Obs', 'Pagamento', 'Cliente'];

  const loadOrders = async () => {
    const ordersList = await OrdersService.listOrdersWithCustomer();

    const filteredOrdersList = ordersList.map((i) => ({
      id: i.id,
      date: formatDate(i.date),
      qt_products: i.qt_products,
      subtotal: i.subtotal,
      discount: i.discount,
      total: i.total,
      obs: i.obs,
      transaction: i.transaction,
      name: i.customer.name,
    }));
    setOrders(filteredOrdersList);
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
