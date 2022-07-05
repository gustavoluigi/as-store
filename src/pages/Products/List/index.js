/* eslint-disable no-param-reassign */
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { useDebounce } from '../../../hooks/useDebounce';
import ProductsService from '../../../services/ProductsService';
import { AddIcon, Button } from './styles';

function Products() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearch = useDebounce(searchTerm, 500);
  const tableHeads = ['Nome', 'Preço', 'Descrição', 'Marca'];

  const {
    data: products,
    error,
    isError,
    isLoading,
  } = useQuery(['products', { debounceSearch }], () => ProductsService.listProducts(debounceSearch));

  const handleTableClick = (productId) => {
    navigate(`../${productId}`);
  };

  const handleAddClick = () => {
    navigate('../criar');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <Button onClick={handleAddClick}>
        <AddIcon />
        Novo produto
      </Button>
      <PageTitle>Produtos</PageTitle>
      <Wrapper>
        <Input
          label="Pesquisar"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Pesquise pelo nome do produto:"
        />
        {isLoading && <div>Aguarde...</div>}
        {isError && <div>Erro! {error.message}</div>}
        {!isLoading && !isError && (
        <Table
          tableHeads={tableHeads}
          tableRows={products}
          handleClick={handleTableClick}
        />
        )}
      </Wrapper>
    </>
  );
}

export default Products;
