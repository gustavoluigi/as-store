import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import OrdersService from '../../../services/OrdersService';
import { formatPrice } from '../../../utils';
import { Details } from './styles';

function Order() {
  const tableHeads = ['ID', 'Nome', 'Preço', 'Quantidade', 'Cor', 'Tamanho', 'Marca', 'Subtotal'];
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState();

  const getOrder = async () => {
    const orderDetails = await OrdersService.getOrderWithProductsAndCustomer(id);
    setOrder(orderDetails);
    const filteredProducts = orderDetails.order_products.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
      brand: item.brand,
      subtotal: item.total,
    }));
    setProducts(filteredProducts);
  };

  useEffect(() => {
    getOrder();
  }, []);
  return (
    <>
      <BackButton />
      <PageTitle>Venda número {id}</PageTitle>
      {order && (
        <Details>
          <div>
            <p>Nome do cliente:</p>
            <span>{order.customer.name}</span>
          </div>
          <div>
            <p>Data da compra:</p>
            <span>{order.date}</span>
          </div>
          <div>
            <p>Quantidade de produtos:</p>
            <span>{order.qt_products}</span>
          </div>
          <div>
            <p>Subtotal:</p>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div>
            <p>Desconto:</p>
            <span>{order.discount === 0 ? '-' : `${order.discount} %`}</span>
          </div>
          <div>
            <p>Valor total da compra:</p>
            <span>{formatPrice(order.total)}</span>
          </div>
          <div>
            <p>Forma de pagamento:</p>
            <span>{order.transaction}</span>
          </div>
          <div>
            <p>Obersações:</p>
            <span>{order.obs}</span>
          </div>
        </Details>
      )}
      <Table tableHeads={tableHeads} tableRows={products} />
    </>
  );
}

export default Order;
