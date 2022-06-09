/* eslint-disable max-len */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import PageTitle from '../../../components/PageTitle';

import Private from '../../../layout/Private';
import CustomersService from '../../../services/CustomersService';
import { Toast, triggerToast } from '../../../utils/triggerToast';
import { Button, Wrapper } from './styles';

function CreateCustomer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: null,
    phone: null,
    address: null,
    zipcode: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CustomersService.createCustomer(formData)
      .then((res) => {
        triggerToast('success', 'Cliente cadastrado com sucesso');
        return res;
      })
      .then((res) => {
        setTimeout(() => {
          navigate(`/clientes/${res.id}`, { replace: true });
        }, 2000);
      });
  };

  return (
    <Private>
      <Toast theme="colored" />
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
