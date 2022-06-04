/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';
import { AddIcon, Button } from './styles';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const tableHeads = ['ID', 'Data', 'Qt. Produtos', 'Desconto', 'Total', 'Obs', 'Pagamento', 'Cliente'];

  const getOrders = async () => {
    await fetch('_mock/orders.json')
      .then((response) => response.json())
      .then((json) => {
        json.map((item) => {
          item.discount = item.discount === 0 ? '-' : `${item.discount} %`;
          // delete item.id;
          return item;
        });
        setOrders(json);
      });
  };

  const handleTableClick = (orderId) => {
    navigate(`../pedidos/${orderId}`, { replace: true });
  };

  const handleAddClick = () => {
    navigate('../pedidos/criar', { replace: false });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Private>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Novo pedido
      </Button>
      <PageTitle>Pedidos</PageTitle>
      <Table tableHeads={tableHeads} tableRows={orders} handleClick={handleTableClick} />
    </Private>
  );
}

export default Orders;
