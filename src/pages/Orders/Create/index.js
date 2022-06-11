/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Form/Input';
import Modal from '../../../components/Modal';
import PageTitle from '../../../components/PageTitle';
import Select from '../../../components/Form/Select';
import Table from '../../../components/Table';
import Textarea from '../../../components/Form/Textarea';
import Private from '../../../layout/Private';
import {
  AddIcon, Button, Details, Wrapper,
} from './styles';
import CustomersService from '../../../services/CustomersService';
import TransactionsService from '../../../services/TransactionsService';
import ProductsService from '../../../services/ProductsService';
import OrdersService from '../../../services/OrdersService';
import { triggerToast, formatPrice } from '../../../utils';

function CreateOrder() {
  const navigate = useNavigate();
  const tableHeadsSelectedProducts = ['ID', 'Nome', 'Preço', 'Cor', 'Tamanho', 'Marca', 'Quantidade', 'Subtotal'];
  const tableHeads = ['ID', 'Nome', 'Preço', 'Tamanho', 'Cor', 'Marca', 'Descrição', 'Estoque', 'Referência', 'SKU'];
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  // Form fields
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [orderData, setOrderData] = useState({
    date: null,
    qt_products: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    obs: null,
    transaction: null,
    customerId: null,
  });

  const getCustomers = async () => {
    const customersList = await CustomersService.listCustomers();
    const filteredCustomersList = customersList.map((item) => ({
      key: item.id,
      value: item.id,
      label: item.name,
    }));
    setCustomers(filteredCustomersList);
  };

  const getTransactions = async () => {
    const transactionsList = await TransactionsService.listTransactions();
    const filteredTransactionsList = transactionsList.map((item) => ({
      key: item.id,
      value: item.id,
      label: item.type,
    }));
    setTransactions(filteredTransactionsList);
  };

  const getProducts = async () => {
    const productsList = await ProductsService.listProducts();
    setProducts(productsList);
  };

  const updateTotal = () => {
    setOrderData((prevState) => ({
      ...prevState,
      total: prevState.subtotal - prevState.subtotal * (prevState.discount / 100),
    }));
  };

  const handleSelectProduct = (id, checked) => {
    const product = products.filter((item) => item.id === id)[0];
    const checkAlreadyOnList = selectedProducts.map((item) => item.id === id).includes(true);
    if (checked && !checkAlreadyOnList) {
      setSelectedProducts((prevState) => [
        ...prevState,
        {
          id: product.id,
          name: product.name,
          price: parseInt(product.price, 10),
          color: product.color,
          size: product.size,
          brand: product.brand,
          quantity: 1,
          subtotal: parseInt(product.price, 10),
          checked: true,
        },
      ]);
      setOrderData((prevState) => ({
        ...prevState,
        qt_products: prevState.qt_products + 1,
        subtotal: prevState.subtotal + product.price,
      }));
      updateTotal();
    } else if (!checkAlreadyOnList) {
      setOrderData((prevState) => ({
        ...prevState,
        qt_products: prevState.qt_products - 1,
        subtotal: prevState.subtotal - product.price,
      }));
      updateTotal();
      setSelectedProducts((prevState) => [...prevState.filter((item) => item.id !== id)]);
    }
  };

  const handleUnselectProduct = (id) => {
    const product = selectedProducts.filter((item) => item.id === id)[0];
    setOrderData((prevState) => ({
      ...prevState,
      qt_products: prevState.qt_products - product.quantity,
      subtotal: prevState.subtotal - product.subtotal,
    }));
    updateTotal();
    setSelectedProducts((prevState) => [...prevState.filter((item) => item.id !== id)]);
  };

  const handleOpenSummaryModal = () => {
    setOpenSummaryModal(true);
  };

  const handleUpdateQt = (id, newQt) => {
    const product = selectedProducts.filter((item) => item.id === id)[0];
    const index = selectedProducts.indexOf(product);
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = {
      ...newSelectedProducts[index],
      quantity: parseInt(newQt, 10),
      subtotal: newSelectedProducts[index].price * newQt,
    };
    setOrderData((prevState) => ({
      ...prevState,
      qt_products: prevState.qt_products - product.quantity + newSelectedProducts[index].quantity,
      subtotal: prevState.subtotal - product.subtotal + newSelectedProducts[index].subtotal,
    }));
    updateTotal();
    setSelectedProducts(newSelectedProducts);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const orderProductsList = selectedProducts.map((e, i) => ({
      unit_price: selectedProducts[i].price,
      quantity: e.quantity,
      total: selectedProducts[i].price * e.quantity,
      productId: selectedProducts[i].id,
    }));
    await OrdersService.createOrder(orderData, orderProductsList).then((res) => {
      triggerToast('success', 'Produto cadastrado com sucesso');
      return res;
    })
      .then((res) => {
        setTimeout(() => {
          navigate(`/vendas/${res.id}`, { replace: true });
        }, 2000);
      });
  };

  useEffect(() => {
    getCustomers();
    getTransactions();
    getProducts();
  }, []);

  return (
    <Private>
      <Modal isOpen={openModal} onClickClose={() => setOpenModal(false)}>
        <h2 className="mt-10 mb-4">Busque e selecione os produtos desejados</h2>
        <Table tableHeads={tableHeads} tableRows={products} hasSearch hasSelection handleSelect={handleSelectProduct} />
        <Button onClick={() => setOpenModal(false)}>Finalizar</Button>
      </Modal>
      <Modal isOpen={openSummaryModal} onClickClose={() => setOpenSummaryModal(false)}>
        <h3>Resumo do pedido</h3>
        <Details>
          <div>
            <p>Nome do cliente:</p>
            <span>{customers.filter((i) => i.value === orderData.customerId)[0]?.label}</span>
          </div>
          <div>
            <p>Data da compra:</p>
            <span>{orderData?.date}</span>
          </div>
          <div>
            <p>Quantidade de produtos:</p>
            <span>{orderData.qt_products}</span>
          </div>
          <div>
            <p>Subtotal da compra:</p>
            <span>{formatPrice(orderData.subtotal)}</span>
          </div>
          <div>
            <p>Desconto:</p>
            <span>{orderData.discount}%</span>
          </div>
          <div>
            <p>Valor final:</p>
            <span>{formatPrice(orderData.total)}</span>
          </div>
          <div>
            <p>Forma de pagamento:</p>
            <span>{orderData?.transaction}</span>
          </div>
          <div>
            <p>Obersações:</p>
            <span>{orderData?.obs}</span>
          </div>
        </Details>
        <Button onClick={handleSubmit}>Confirmar</Button>
        <Button onClick={() => setOpenSummaryModal(false)}>Cancelar</Button>
      </Modal>
      <BackButton />
      <PageTitle>Novo pedido</PageTitle>
      <Wrapper>
        <form>
          <Select
            label="Cliente"
            options={customers}
            value={customers.filter((item) => item.id === orderData.customerId).id}
            onChange={(event) => setOrderData((prevState) => ({ ...prevState, customerId: parseInt(event.target.value, 10) }))}
          />
          <Input
            label="Data"
            id="date"
            name="date"
            type="date"
            value={orderData.date ? orderData.date : ''}
            onChange={(event) => setOrderData((prevState) => ({ ...prevState, date: event.target.value }))}
          />
          <Select
            label="Forma de pagamento"
            options={transactions}
            defaultValue={orderData.transaction ? orderData.transaction : ''}
            onChange={(event) => setOrderData((prevState) => ({
              ...prevState,
              transaction: transactions.filter((i) => i.value === parseInt(event.target.value, 10))[0].label,
            }))}
          />
          <Input
            label="Desconto (%)"
            id="discount"
            name="discount"
            type="text"
            value={orderData.discount ? orderData.discount : 0}
            onChange={(event) => {
              setOrderData((prevState) => ({ ...prevState, discount: parseInt(event.target.value, 10) }));
              updateTotal();
            }}
          />
          <Textarea
            label="Observações"
            id="obs"
            name="obs"
            value={orderData.obs ? orderData.obs : ''}
            onChange={(event) => setOrderData((prevState) => ({ ...prevState, obs: event.target.value }))}
          />
          <Button type="button" onClick={() => setOpenModal(true)}>
            <AddIcon />
            Adicionar produtos
          </Button>
          <h2>Produtos selecionados</h2>
          <Table
            tableHeads={tableHeadsSelectedProducts}
            tableRows={selectedProducts}
            hasSelection
            handleSelect={handleUnselectProduct}
            qtEditable
            updateQt={handleUpdateQt}
          />
        </form>
        <Button onClick={handleOpenSummaryModal}>Finalizar pedido</Button>
      </Wrapper>
    </Private>
  );
}

export default CreateOrder;
