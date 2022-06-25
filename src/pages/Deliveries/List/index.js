/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../components/PageTitle';
import { Wrapper } from '../../../components/Layout/Wrapper';
import DeliveriesService from '../../../services/DeliveriesService';
import Table from '../../../components/Table';
import { formatDate } from '../../../utils';
import { AddIcon, Button } from './styles';

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
    navigate(`../${deliveryId}`);
  };

  const handleAddClick = () => {
    navigate('../criar');
  };

  useEffect(() => {
    getDeliveries();
  }, []);
  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Novo delivery
      </Button>
      <PageTitle>Delivery</PageTitle>
      <Wrapper>
        <Table tableHeads={tableHeads} tableRows={deliveries} hasSearch handleClick={handleTableClick} />
      </Wrapper>
    </>
  );
}

export default Deliveries;
