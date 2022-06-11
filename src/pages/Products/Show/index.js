/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import Select from '../../../components/Form/Select';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Private from '../../../layout/Private';
import ProductsService from '../../../services/ProductsService';
import { ButtonFloat, EditIcon } from '../../Customers/Show/styles';
import { Toast, triggerToast } from '../../../utils/triggerToast';
import { Button } from './styles';

function Product() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enableEdit, setEnableEdit] = useState(false);
  const [product, setProduct] = useState({
    id: 0,
    name: '',
    price: 0,
    desc: '',
    color: '',
    size: '',
    brand: '',
    storage: 0,
    ref: '',
    sku: '',
  });

  const getProduct = async () => {
    const productDetails = await ProductsService.getProduct(id);
    setProduct(productDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ProductsService.editProduct(id, product).then(triggerToast('success', 'Produto alterado com sucesso'));
    setEnableEdit(false);
  };

  const handleEnableEdit = () => {
    setEnableEdit(true);
  };

  const handleDelete = async () => {
    await ProductsService.deleteProduct(id)
      .then(triggerToast('error', 'Produto deletado'))
      .finally(() => {
        setTimeout(() => {
          navigate('/produtos', { replace: true });
        }, 2000);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (

    <Private>
      <Toast />
      <ButtonFloat danger onClick={handleDelete}>
        <EditIcon />
        Deletar produto
      </ButtonFloat>
      <ButtonFloat onClick={handleEnableEdit}>
        <EditIcon />
        Editar produto
      </ButtonFloat>
      <PageTitle>{product.name}</PageTitle>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            id="name"
            name="name"
            type="text"
            readOnly={!enableEdit}
            value={product.name ? product.name : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, name: event.target.value }))}
          />
          <Input
            label="Preço"
            id="price"
            name="price"
            type="text"
            readOnly={!enableEdit}
            value={product.price ? product.price : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, price: event.target.value }))}
          />
          <Textarea
            label="Descrição"
            id="desc"
            name="desc"
            type="text"
            readOnly={!enableEdit}
            value={product.desc ? product.desc : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, desc: event.target.value }))}
          />
          <Input
            label="Cor"
            id="color"
            name="color"
            type="text"
            readOnly={!enableEdit}
            value={product.color ? product.color : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, color: event.target.value }))}
          />
          <Input
            label="Tamanho"
            id="size"
            name="size"
            type="text"
            readOnly={!enableEdit}
            value={product.size ? product.size : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, size: event.target.value }))}
          />
          <Input
            label="Marca"
            id="brand"
            name="brand"
            type="text"
            readOnly={!enableEdit}
            value={product.brand ? product.brand : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, brand: event.target.value }))}
          />
          <Input
            label="Quantidade em estoque"
            id="storage"
            name="storage"
            type="text"
            readOnly={!enableEdit}
            value={product.storage}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, storage: parseInt(event.target.value, 10) }))}
          />
          <Input
            label="Referência"
            id="ref"
            name="ref"
            type="text"
            readOnly={!enableEdit}
            value={product.ref ? product.ref : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, ref: event.target.value }))}
          />
          <Input
            label="SKU"
            id="sku"
            name="sku"
            type="text"
            readOnly={!enableEdit}
            value={product.sku ? product.sku : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, sku: event.target.value }))}
          />
          {enableEdit && <Button type="submit">Salvar</Button>}
        </form>
      </Wrapper>

    </Private>

  );
}

export default Product;
