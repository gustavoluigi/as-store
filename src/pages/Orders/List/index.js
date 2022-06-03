/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';

function Orders() {
  const [orders, setOrders] = useState();
  const tableHeads = ['Data', 'Qt. Produtos', 'Desconto', 'Total', 'Obs', 'Pagamento', 'Cliente'];

  const getOrders = () => {
    fetch('_mock/orders.json')
      .then((response) => response.json())
      .then((json) => {
        json.map((item) => {
          item.discount = item.discount === 0 ? '-' : `${item.discount} %`;
          delete item.id;
          return item;
        });
        setOrders(json);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Private>
      <PageTitle>Pedidos</PageTitle>
      <Table tableHeads={tableHeads} tableRows={orders} />
    </Private>
  );
}

export default Orders;
