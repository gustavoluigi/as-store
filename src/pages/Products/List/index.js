/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import Private from '../../../layout/Private';

function Products() {
  const [products, setProducts] = useState();
  const tableHeads = ['Nome', 'Preço', 'REF', 'COD', 'Estoque', 'Obs', 'Cor', 'Tamanho'];

  const getProducts = () => {
    fetch('_mock/products.json')
      .then((response) => response.json())
      .then((json) => {
        json.map((item) => {
          delete item.id;
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
      <Table tableHeads={tableHeads} tableRows={products} />
    </Private>
  );
}

export default Products;
