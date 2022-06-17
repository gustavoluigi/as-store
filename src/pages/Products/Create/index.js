/* eslint-disable max-len */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import ProductsService from '../../../services/ProductsService';
import { formatPrice, unformatPrice } from '../../../utils';
import { Toast, triggerToast } from '../../../utils/triggerToast';
import { Button } from './styles';

function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: null,
    price: 'R$ 123,22',
    desc: null,
    color: null,
    size: null,
    brand: null,
    storage: null,
    ref: null,
    sku: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    // await ProductsService.createProduct(product)
    //   .then((res) => {
    //     triggerToast('success', 'Produto cadastrado com sucesso');
    //     return res;
    //   })
    //   .then((res) => {
    //     setTimeout(() => {
    //       navigate(`/produtos/${res.id}`);
    //     }, 2000);
    //   });
    console.log(product);
  };
  return (
    <>
      <Toast />
      <PageTitle>Novo produto</PageTitle>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            id="name"
            name="name"
            type="text"
            value={product.name ? product.name : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, name: event.target.value }))}
          />
          <Input
            label="Preço"
            id="price"
            name="price"
            type="text"
            value={product.price ? product.price : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, price: event.target.value }))}
          />
          <Textarea
            label="Descrição"
            id="desc"
            name="desc"
            type="text"
            value={product.desc ? product.desc : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, desc: event.target.value }))}
          />
          <Input
            label="Cor"
            id="color"
            name="color"
            type="text"
            value={product.color ? product.color : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, color: event.target.value }))}
          />
          <Input
            label="Tamanho"
            id="size"
            name="size"
            type="text"
            value={product.size ? product.size : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, size: event.target.value }))}
          />
          <Input
            label="Marca"
            id="brand"
            name="brand"
            type="text"
            value={product.brand ? product.brand : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, brand: event.target.value }))}
          />
          <Input
            label="Quantidade em estoque"
            id="storage"
            name="storage"
            type="number"
            value={product.storage ? product.storage : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, storage: event.target.value }))}
          />
          <Input
            label="Referência"
            id="ref"
            name="ref"
            type="text"
            value={product.ref ? product.ref : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, ref: event.target.value }))}
          />
          <Input
            label="SKU"
            id="sku"
            name="sku"
            type="text"
            value={product.sku ? product.sku : ''}
            onChange={(event) => setProduct((prevState) => ({ ...prevState, sku: event.target.value }))}
          />
          <Button type="submit">
            Criar produto
          </Button>
        </form>
      </Wrapper>
    </>
  );
}

export default CreateProduct;
