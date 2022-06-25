import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Input from '../../../components/Form/Input';
import Modal from '../../../components/Modal';
import PageTitle from '../../../components/PageTitle';
import Select from '../../../components/Form/Select';
import Table from '../../../components/Table';
import Textarea from '../../../components/Form/Textarea';
import {
  AddIcon, Button, Details, Wrapper,
} from './styles';
import CustomersService from '../../../services/CustomersService';
import ProductsService from '../../../services/ProductsService';
import OrdersService from '../../../services/OrdersService';
import { formatPrice, triggerToast } from '../../../utils';

function CreateDelivery() {
  const navigate = useNavigate();
  const tableHeadsSelectedProducts = ['ID', 'Nome', 'Preço', 'Cor', 'Tamanho', 'Marca', 'Quantidade', 'Subtotal'];
  const tableHeads = ['ID', 'Nome', 'Preço', 'Tamanho', 'Cor', 'Marca', 'Descrição', 'Estoque', 'Referência', 'SKU'];
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSummaryModal, setOpenSummaryModal] = useState(false);

  // Form fields
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [deliveryData, setDeliveryData] = useState({
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

  const getProducts = async () => {
    const productsList = await ProductsService.listProducts();
    const filteredProductsList = productsList.filter((product) => product.storage > 0);
    setProducts(filteredProductsList);
  };

  const updateTotal = () => {
    setDeliveryData((prevState) => ({
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
          price: parseFloat(product.price),
          color: product.color,
          size: product.size,
          brand: product.brand,
          quantity: 1,
          subtotal: parseFloat(product.price),
          checked: true,
        },
      ]);
      setDeliveryData((prevState) => ({
        ...prevState,
        qt_products: parseInt(prevState.qt_products, 10) + 1,
        subtotal: parseFloat(prevState.subtotal) + parseFloat(product.price),
      }));
      updateTotal();
    } else if (!checkAlreadyOnList) {
      setDeliveryData((prevState) => ({
        ...prevState,
        qt_products: parseInt(prevState.qt_products, 10) - 1,
        subtotal: parseFloat(prevState.subtotal) - parseFloat(product.price),
      }));
      updateTotal();
      setSelectedProducts((prevState) => [...prevState.filter((item) => item.id !== id)]);
    }
  };

  const handleUnselectProduct = (id) => {
    const product = selectedProducts.filter((item) => item.id === id)[0];
    setDeliveryData((prevState) => ({
      ...prevState,
      qt_products: parseInt(prevState.qt_products, 10) - parseInt(product.quantity, 10),
      subtotal: parseFloat(prevState.subtotal) - parseFloat(product.subtotal),
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
      subtotal: parseFloat(newSelectedProducts[index].price) * newQt,
    };
    setDeliveryData((prevState) => ({
      ...prevState,
      qt_products:
        parseInt(prevState.qt_products, 10)
        - parseInt(product.quantity, 10)
        + parseInt(newSelectedProducts[index].quantity, 10),
      subtotal:
        parseFloat(prevState.subtotal)
        - parseFloat(product.subtotal)
        + parseFloat(newSelectedProducts[index].subtotal),
    }));
    updateTotal();
    setSelectedProducts(newSelectedProducts);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const orderProductsList = selectedProducts.map((e, i) => ({
      unit_price: parseFloat(selectedProducts[i].price),
      quantity: parseInt(e.quantity, 10),
      total: parseFloat(selectedProducts[i].price) * parseFloat(e.quantity),
      productId: selectedProducts[i].id,
    }));
    await OrdersService.createOrder(deliveryData, orderProductsList)
      .then((res) => {
        triggerToast('success', 'Venda cadastrado com sucesso');
        return res;
      })
      .then((res) => {
        setTimeout(() => {
          navigate(`/vendas/${res.id}`);
        }, 2000);
      });
  };

  useEffect(() => {
    getCustomers();
    getProducts();
  }, []);
  return (
    <>
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
            <span>{customers.filter((i) => i.value === deliveryData.customerId)[0]?.label}</span>
          </div>
          <div>
            <p>Data da compra:</p>
            <span>{deliveryData?.date}</span>
          </div>
          <div>
            <p>Quantidade de produtos:</p>
            <span>{deliveryData.qt_products}</span>
          </div>
          <div>
            <p>Subtotal da compra:</p>
            <span>{formatPrice(deliveryData.subtotal)}</span>
          </div>
          <div>
            <p>Desconto:</p>
            <span>{deliveryData.discount}%</span>
          </div>
          <div>
            <p>Valor final:</p>
            <span>{formatPrice(deliveryData.total)}</span>
          </div>
          <div>
            <p>Forma de pagamento:</p>
            <span>{deliveryData?.transaction}</span>
          </div>
          <div>
            <p>Obersações:</p>
            <span>{deliveryData?.obs}</span>
          </div>
        </Details>
        <Button onClick={handleSubmit}>Confirmar</Button>
        <Button onClick={() => setOpenSummaryModal(false)}>Cancelar</Button>
      </Modal>
      <BackButton />
      <PageTitle>Novo delivery</PageTitle>
      <Wrapper>
        <Wrapper>
          <form>
            <Select
              label="Cliente"
              options={customers}
              value={customers.filter((item) => item.id === deliveryData.customerId).id}
              onChange={(event) => {
                setDeliveryData((prevState) => ({
                  ...prevState,
                  customerId: parseInt(event.target.value, 10),
                }));
              }}
            />
            <Input
              label="Data entrega"
              id="date"
              name="date"
              type="date"
              value={deliveryData.dateDelivery ? deliveryData.dateDelivery : ''}
              onChange={(event) => {
                setDeliveryData((prevState) => ({
                  ...prevState,
                  dateDelivery: event.target.value,
                }));
              }}
            />
            <Input
              label="Data devolução"
              id="date"
              name="date"
              type="date"
              value={deliveryData.dateDevolution ? deliveryData.dateDevolution : ''}
              onChange={(event) => {
                setDeliveryData((prevState) => ({
                  ...prevState,
                  dateDevolution: event.target.value,
                }));
              }}
            />
            <Textarea
              label="Observações"
              id="obs"
              name="obs"
              value={deliveryData.obs ? deliveryData.obs : ''}
              onChange={(event) => {
                setDeliveryData((prevState) => ({
                  ...prevState,
                  obs: event.target.value,
                }));
              }}
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
          <Button onClick={handleOpenSummaryModal}>Salvar delivery</Button>
        </Wrapper>
      </Wrapper>
    </>
  );
}

export default CreateDelivery;
