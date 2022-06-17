/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import ProductsService from '../../../services/ProductsService';
import { AddIcon, Button } from './styles';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const tableHeads = ['ID', 'Nome', 'Preço', 'Tamanho', 'Cor', 'Marca', 'Descrição', 'Estoque', 'Referência', 'SKU'];

  const getProducts = async () => {
    const productsList = await ProductsService.listProducts();
    setProducts(productsList);
  };

  const handleTableClick = (productId) => {
    navigate(`../${productId}`);
  };

  const handleAddClick = () => {
    navigate('../criar');
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Novo produto
      </Button>
      <PageTitle>Produtos</PageTitle>
      <Wrapper>
        <Table
          tableHeads={tableHeads}
          tableRows={products}
          hasSearch
          handleClick={handleTableClick}
        />
      </Wrapper>
    </>
  );
}

export default Products;
