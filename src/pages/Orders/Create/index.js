/* eslint-disable max-len */
import { useEffect, useState } from 'react';
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
import formatPrice from '../../../utils/formatPrice';

function CreateOrder() {
  const tableHeadsSelectedProducts = ['ID', 'Nome', 'Preço', 'Cor', 'Tamanho', 'Marca', 'Quantidade', 'Subtotal'];
  const tableHeads = ['ID', 'Nome', 'Preço', 'Ref', 'SKU', 'Estoque', 'Observações', 'Cor', 'Tamanho', 'Marca'];
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  // Form fields
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer: {
      id: null,
      name: null,
    },
    date: null,
    transaction: {
      id: null,
      type: null,
    },
    discount: null,
    obs: null,
    total: 0,
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
        // setProducts(json.map((item) => ({ ...item, checked: false })));
        setProducts(json);
      });
  };

  const handleAddProduct = () => {
    setOpenModal(true);
  };

  const handleOpenSummaryModal = () => {
    setOpenSummaryModal(true);
  };

  const handleSelectProduct = (id, checked) => {
    const product = products.filter((item) => item.id === id)[0];
    const filteredProduct = [product].map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      color: item.id_color,
      size: item.id_size,
      brand: item.id_brand,
      quantity: 1,
      subtotal: 1 * item.price,
    }));
    if (checked) {
      setFormData((prevState) => ({
        ...prevState,
        total: prevState.total + filteredProduct[0].subtotal,
        products: [...prevState.products, filteredProduct[0]],
      }));
      setSelectedProducts((prevState) => [...prevState, { ...filteredProduct[0], checked: true }]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        total: prevState.total - filteredProduct[0].subtotal,
        products: [...prevState.products.filter((item) => item.id !== id)],
      }));
      setSelectedProducts((prevState) => [...prevState.filter((item) => item.id !== id)]);
    }
  };

  const handleUnselectProduct = (id) => {
    const productSubtotal = selectedProducts.filter((item) => item.id === id)[0].subtotal;
    setFormData((prevState) => ({
      ...prevState,
      total: prevState.total - productSubtotal,
      products: [...prevState.products.filter((item) => item.id !== id)],
    }));
    setSelectedProducts((prevState) => [...prevState.filter((item) => item.id !== id)]);
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
    console.log(product.quantity);
    console.log(newQt);
    setFormData((prevState) => ({
      ...prevState,
      total: prevState.total - product.subtotal + newSelectedProducts[index].subtotal,
      products: newSelectedProducts,
    }));
    setSelectedProducts(newSelectedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(selectedProducts);
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
        <Table
          tableHeads={tableHeads}
          tableRows={products}
          hasSearch
          hasSelection
          handleSelect={handleSelectProduct}
        />
        <Button onClick={() => setOpenModal(false)}>Finalizar</Button>
      </Modal>
      <Modal isOpen={openSummaryModal} onClickClose={() => setOpenSummaryModal(false)}>
        <h3>Resumo do pedido</h3>
        <Details>
          <div>
            <p>Nome do cliente:</p>
            <span>{formData.customer.name ? formData.customer.name : 'Não selecionado'}</span>
          </div>
          <div>
            <p>Data da compra:</p>
            <span>{formData.date ? formData.date : 'Não selecionado'}</span>
          </div>
          <div>
            <p>Quantidade de produtos:</p>
            <span>{selectedProducts.length}</span>
          </div>
          <div>
            <p>Valor total da compra:</p>
            <span>{formatPrice(formData.total)}</span>
          </div>
          <div>
            <p>Desconto:</p>
            <span>
              {formData.discount ? formData.discount : 0}
              %
            </span>
          </div>
          <div>
            <p>Valor final:</p>
            <span>{formatPrice(formData.total - formData.total * (formData.discount / 100))}</span>
          </div>
          <div>
            <p>Forma de pagamento:</p>
            <span>{formData.transaction.type ? formData.transaction.type : 'Não selecionado'}</span>
          </div>
          <div>
            <p>Obersações:</p>
            <span>{formData.obs ? formData.obs : '-'}</span>
          </div>
        </Details>
      </Modal>
      <BackButton />
      <PageTitle>Novo pedido</PageTitle>
      <Wrapper>
        <Details>
          <div>
            <p>Nome do cliente:</p>
            <span>{formData.customer.name ? formData.customer.name : 'Não selecionado'}</span>
          </div>
          <div>
            <p>Data da compra:</p>
            <span>{formData.date ? formData.date : 'Não selecionado'}</span>
          </div>
          <div>
            <p>Quantidade de produtos:</p>
            <span>{selectedProducts.length}</span>
          </div>
          <div>
            <p>Valor total da compra:</p>
            <span>{formatPrice(formData.total)}</span>
          </div>
          <div>
            <p>Desconto:</p>
            <span>
              {formData.discount ? formData.discount : 0}
              %
            </span>
          </div>
          <div>
            <p>Valor final:</p>
            <span>{formatPrice(formData.total - formData.total * (formData.discount / 100))}</span>
          </div>
          <div>
            <p>Forma de pagamento:</p>
            <span>{formData.transaction.type ? formData.transaction.type : 'Não selecionado'}</span>
          </div>
          <div>
            <p>Obersações:</p>
            <span>{formData.obs ? formData.obs : '-'}</span>
          </div>
        </Details>
        <form onSubmit={handleSubmit}>
          <Select
            label="Cliente"
            options={customers}
            value={formData.customer.id ? formData.customer.id : ''}
            onChange={(event) => setFormData((prevState) => ({
              ...prevState,
              customer: {
                id: parseInt(event.target.value, 10),
                name: customers.filter((item) => item.value === parseInt(event.target.value, 10))[0].label,
              },
            }))}
          />
          <Input
            label="Data"
            id="date"
            name="date"
            type="date"
            value={formData.date ? formData.date : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, date: event.target.value }))}
          />
          <Select
            label="Forma de pagamento"
            options={transactions}
            defaultValue={formData.transaction ? formData.transaction : ''}
            onChange={(event) => setFormData((prevState) => ({
              ...prevState,
              transaction: {
                id: parseInt(event.target.value, 10),
                type: transactions.filter((item) => item.value === parseInt(event.target.value, 10))[0].label,
              },
            }))}
          />
          <Input
            label="Desconto (%)"
            id="discount"
            name="discount"
            type="discount"
            value={formData.discount ? formData.discount : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, discount: event.target.value }))}
          />
          <Textarea
            label="Observações"
            id="obs"
            name="obs"
            value={formData.obs ? formData.obs : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, obs: event.target.value }))}
          />
          <Button type="button" onClick={handleAddProduct}>
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
          <button type="submit">enviar</button>
        </form>
        <Button onClick={handleOpenSummaryModal}>Finalizar pedido</Button>
      </Wrapper>
    </Private>
  );
}

export default CreateOrder;
