/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';

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

  const handleClick = (orderId) => {
    navigate(`../pedidos/${orderId}`, { replace: true });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Private>
      <PageTitle>Pedidos</PageTitle>
      <Table tableHeads={tableHeads} tableRows={orders} handleClick={handleClick} />
    </Private>
  );
}

export default Orders;
