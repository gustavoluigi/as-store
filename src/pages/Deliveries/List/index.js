/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Private from '../../../layout/Private';
import PageTitle from '../../../components/PageTitle';
import { Wrapper } from '../../../components/Layout/Wrapper';
import DeliveriesService from '../../../services/DeliveriesService';
import Table from '../../../components/Table';
import { formatDate } from '../../../utils';

function Deliveries() {
  const navigate = useNavigate();
  const tableHeads = ['ID', 'Cliente', 'Data de entrega', 'Data de retirada', 'Produtos'];
  const [deliveries, setDeliveries] = useState();

  const getDeliveries = async () => {
    const deliveriesList = await DeliveriesService.listDeliveriesWithCustomer();

    const filteredDeliveriesList = deliveriesList.map((delivery) => ({
      id: delivery.id,
      name: delivery.customer.name,
      dateInit: formatDate(delivery.dateInit),
      dateEnd: formatDate(delivery.dateEnd),
      qtProducts: delivery.qtProducts,
    }));
    setDeliveries(filteredDeliveriesList);
  };

  const handleTableClick = (deliveryId) => {
    navigate(`../delivery/${deliveryId}`);
  };

  useEffect(() => {
    getDeliveries();
  }, []);
  return (
    <Private>
      <PageTitle>Delivery</PageTitle>
      <Wrapper>
        <Table tableHeads={tableHeads} tableRows={deliveries} hasSearch handleClick={handleTableClick} />
      </Wrapper>
    </Private>
  );
}

export default Deliveries;
