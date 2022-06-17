/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { AddIcon, Button } from './styles';
import OrdersService from '../../../services/OrdersService';
import { formatDate } from '../../../utils';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const tableHeads = ['ID', 'Data', 'Cliente', 'Qt. Produtos', 'Subtotal', 'Desconto', 'Total', 'Obs', 'Pagamento'];

  const loadOrders = async () => {
    const ordersList = await OrdersService.listOrdersWithCustomer();

    const filteredOrdersList = ordersList.map((i) => ({
      id: i.id,
      date: formatDate(i.date),
      name: i.customer.name,
      qt_products: i.qt_products,
      subtotal: i.subtotal,
      discount: i.discount,
      total: i.total,
      obs: i.obs,
      transaction: i.transaction,
    }));
    setOrders(filteredOrdersList);
  };

  const handleTableClick = (orderId) => {
    navigate(`../${orderId}`);
  };

  const handleAddClick = () => {
    navigate('../criar');
  };

  useEffect(() => {
    loadOrders();
  }, []);
  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Nova venda
      </Button>
      <PageTitle>Vendas</PageTitle>
      <Wrapper>
        <Table tableHeads={tableHeads} tableRows={orders} hasSearch handleClick={handleTableClick} />
      </Wrapper>
    </>
  );
}

export default Orders;
