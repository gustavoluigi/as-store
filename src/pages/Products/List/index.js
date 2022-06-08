/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';

function Products() {
  const [products, setProducts] = useState();
  const tableHeads = ['ID', 'Nome', 'Preço', 'REF', 'Estoque', 'Obs', 'Cor', 'Tamanho', 'Marca'];

  const getProducts = () => {
    fetch('_mock/products.json')
      .then((response) => response.json())
      .then((json) => {
        json.map((item) => {
          delete item.cod;
          return item;
        });
        setProducts(json);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Private>
      <PageTitle>Produtos</PageTitle>
      <Wrapper>
        <Table tableHeads={tableHeads} tableRows={products} hasSearch />
      </Wrapper>
    </Private>
  );
}

export default Products;
