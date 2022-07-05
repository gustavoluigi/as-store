/* eslint-disable max-len */
import { useState } from 'react';
import { useMutation, useQueries } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Datalist from '../../../components/Form/Datalist';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/Select';
import Textarea from '../../../components/Form/Textarea';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import BrandsService from '../../../services/BrandsService';
import ColorsService from '../../../services/ColorsService';
import ProductsService from '../../../services/ProductsService';
import SizesService from '../../../services/SizesService';
import { formatPrice, unformatPrice } from '../../../utils';
import { Toast, triggerToast } from '../../../utils/triggerToast';
import { Button } from './styles';

function CreateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: null,
    price: null,
    desc: null,
    // color_id: null,
    // size_id: null,
    brand_id: null,
    storage: null,
    ref: null,
    sku: null,
  });

  const [
    { data: brands, ...restBrands },
    // { data: sizes, ...restSizes },
    // { data: colors, ...restColors },
  ] = useQueries([
    {
      queryKey: ['brands'],
      queryFn: () => BrandsService.getBrands(),
      select: (data) => data.map((brand) => ({
        value: brand.id,
        label: brand.name,
      })),
    },
    // {
    //   queryKey: ['sizes'],
    //   queryFn: () => SizesService.getSizes(),
    //   select: (data) => data.map((size) => ({
    //     value: size.id,
    //     label: size.name,
    //   })),
    // },
    // {
    //   queryKey: ['colors'],
    //   queryFn: () => ColorsService.getColors(),
    //   select: (data) => data.map((color) => ({
    //     value: color.id,
    //     label: color.name,
    //   })),
    // },
  ]);

  const { mutate: createBrand } = useMutation(BrandsService.createBrand, {
    onSuccess: (data) => {
      restBrands.refetch();
      triggerToast('success', 'Marca adicionada com sucesso');
    },
    onError: (err) => {
      triggerToast('error', err.message);
    },
  });
  // const { mutate: createColor } = useMutation(ColorsService.createColor, {
  //   onSuccess: (data) => {
  //     restColors.refetch();
  //     triggerToast('success', 'Cor adicionada com sucesso');
  //   },
  //   onError: (err) => {
  //     triggerToast('error', err.message);
  //   },
  // });
  // const { mutate: createSize } = useMutation(SizesService.createSize, {
  //   onSuccess: (data) => {
  //     restSizes.refetch();
  //     triggerToast('success', 'Tamanho adicionado com sucesso');
  //   },
  //   onError: (err) => {
  //     triggerToast('error', err.message);
  //   },
  // });
  const { mutate: createProduct } = useMutation(ProductsService.createProduct, {
    onSuccess: (data) => {
      triggerToast('success', 'Produto cadastrado com sucesso');
    },
    onError: (err) => {
      triggerToast('error', err.message);
    },
  });

  const handleSelectChange = ({ value }, { name, action }) => {
    if (action === 'create-option') {
      // if (name === 'color') createColor({ name: value });
      if (name === 'brand') createBrand({ name: value });
      // if (name === 'size') createSize({ name: value });
    }
    setProduct({ ...product, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Create only product variation
    createProduct(product);
  };

  return (
    <>
      <Toast />
      <PageTitle>Novo produto</PageTitle>
      <Wrapper>
        {restBrands.isLoading && <p>Carregando...</p>}
        {!restBrands.isLoading && (
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            id="name"
            name="name"
            type="text"
            value={product.name ? product.name : ''}
            onChange={handleChange}
          />
          <Input
            label="Preço"
            id="price"
            name="price"
            type="text"
            value={product.price ? product.price : ''}
            onChange={handleChange}
          />
          <Textarea
            label="Descrição"
            id="desc"
            name="desc"
            type="text"
            value={product.desc ? product.desc : ''}
            onChange={handleChange}
          />
          <Datalist
            label="Marca"
            id="brand"
            name="brand_id"
            list="brands"
            placeholder="Selecione uma marca"
            options={brands}
            onChange={handleSelectChange}
          />
          {/* <Datalist
            label="Cor"
            id="color"
            name="color_id"
            list="colors"
            placeholder="Selecione uma cor"
            options={colors}
            onChange={handleSelectChange}
          />
          <Datalist
            label="Tamanho"
            id="size"
            name="size_id"
            list="sizes"
            placeholder="Selecione um tamanho"
            options={sizes}
            onChange={handleSelectChange}
          />
          <Input
            label="Quantidade em estoque"
            id="storage"
            name="storage"
            type="number"
            value={product.storage ? product.storage : ''}
            onChange={handleChange}
          />
          <Input
            label="Referência"
            id="ref"
            name="ref"
            type="text"
            value={product.ref ? product.ref : ''}
            onChange={handleChange}
          />
          <Input
            label="SKU"
            id="sku"
            name="sku"
            type="text"
            value={product.sku ? product.sku : ''}
            onChange={handleChange}
          /> */}
          <Button type="submit">
            Criar produto
          </Button>
        </form>
        )}

      </Wrapper>
    </>
  );
}

export default CreateProduct;
