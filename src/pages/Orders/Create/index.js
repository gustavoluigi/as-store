/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { useEffect, useState } from 'react';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Form/Input';
import Modal from '../../../components/Modal';
import PageTitle from '../../../components/PageTitle';
import Select from '../../../components/Form/Select';
import Table from '../../../components/Table';
import Textarea from '../../../components/Form/Textarea';
import Private from '../../../layout/Private';
import { AddIcon, Button, Wrapper } from './styles';

function CreateOrder() {
  const tableHeads = ['ID', 'Nome', 'Preço', 'Cor', 'Tamanho', 'Marca', 'Quantidade', 'Subtotal'];
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // Form fields
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer: null,
    date: null,
    transaction: null,
    obs: null,
    products: [],
  });

  const getCustomers = async () => {
    await fetch('/_mock/customers.json')
      .then((response) => response.json())
      .then((json) => {
        setCustomers(
          json.map((item) => ({
            key: item.id,
            value: item.id,
            label: item.name,
          })),
        );
      });
  };
  const getTransactions = async () => {
    await fetch('/_mock/transactions.json')
      .then((response) => response.json())
      .then((json) => {
        setTransactions(
          json.map((item) => ({
            key: item.id,
            value: item.id,
            label: item.type,
          })),
        );
      });
  };
  const getProducts = async () => {
    await fetch('/_mock/products.json')
      .then((response) => response.json())
      .then((json) => {
        setProducts(json);
      });
  };

  const handleAddProduct = () => {
    setOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {
    getCustomers();
    getTransactions();
    getProducts();
  }, []);

  return (
    <Private>
      <Modal isOpen={openModal} onClickClose={() => setOpenModal(false)}>
        teste
      </Modal>
      <BackButton />
      <PageTitle>Novo pedido</PageTitle>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Select
            label="Cliente"
            options={customers}
            value={formData.customer}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, customer: parseInt(event.target.value, 10) }))}
          />
          <Input
            label="Data"
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, date: event.target.value }))}
          />
          <Select
            label="Forma de pagamento"
            options={transactions}
            value={formData.transaction}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, transaction: parseInt(event.target.value, 10) }))}
          />
          <Textarea
            label="Observações"
            id="obs"
            name="obs"
            value={formData.obs}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, obs: event.target.value }))}
          />
          <button type="submit">enviar</button>
        </form>
      </Wrapper>
      <Button onClick={handleAddProduct}>
        <AddIcon />
        Adicionar produto
      </Button>
      <Table tableHeads={tableHeads} tableRows={products} hasSearch />
    </Private>
  );
}

export default CreateOrder;
