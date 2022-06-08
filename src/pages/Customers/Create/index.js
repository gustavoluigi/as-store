/* eslint-disable max-len */
import { useState } from 'react';
import Input from '../../../components/Form/Input';
import PageTitle from '../../../components/PageTitle';

import Private from '../../../layout/Private';
import { Button, Wrapper } from './styles';

function CreateCustomer() {
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    address: null,
    zipcode: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  return (
    <Private>
      <PageTitle>Novo cliente</PageTitle>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            id="name"
            name="name"
            type="text"
            value={formData.name ? formData.name : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, name: event.target.value }))}
          />
          <Input
            label="Telefone"
            id="phone"
            name="phone"
            type="text"
            value={formData.phone ? formData.phone : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, phone: event.target.value }))}
          />
          <Input
            label="Endereço"
            id="address"
            name="address"
            type="text"
            value={formData.address ? formData.address : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, address: event.target.value }))}
          />
          <Input
            label="CEP"
            id="zipcode"
            name="zipcode"
            type="text"
            value={formData.zipcode ? formData.zipcode : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, zipcode: event.target.value }))}
          />
          <Button type="submit">
            Cadastrar cliente
          </Button>
        </form>
      </Wrapper>
    </Private>
  );
}

export default CreateCustomer;
