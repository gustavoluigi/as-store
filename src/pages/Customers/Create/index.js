/* eslint-disable max-len */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import PageTitle from '../../../components/PageTitle';
import CustomersService from '../../../services/CustomersService';
import { formatCep, formatPhone } from '../../../utils';
import { formatCpf } from '../../../utils/formatCpf';
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
          navigate(`/clientes/${res.id}`);
        }, 2000);
      });
  };

  return (
    <>
      <Toast />
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
            onChange={(event) => setFormData((prevState) => ({ ...prevState, phone: formatPhone(event.target.value) }))}
            maxLength="15"
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
            onChange={(event) => setFormData((prevState) => ({ ...prevState, zipcode: formatCep(event.target.value) }))}
            maxLength="9"
          />
          <Input
            label="Data de nascimento"
            id="birthday"
            name="birthday"
            type="date"
            value={formData.birthday ? formData.birthday : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, birthday: event.target.value }))}
          />
          <Input
            label="CPF"
            id="cpf"
            name="cpf"
            type="text"
            value={formData.cpf ? formData.cpf : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, cpf: formatCpf(event.target.value) }))}
            maxLength="14"
          />
          <Input
            label="Tamanho do sapato"
            id="shoes"
            name="shoes"
            type="text"
            value={formData.shoes ? formData.shoes : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, shoes: event.target.value }))}
          />
          <Input
            label="Tamanho da parte de cima"
            id="top"
            name="top"
            type="text"
            value={formData.top ? formData.top : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, top: event.target.value }))}
          />
          <Input
            label="Tamanho da parte de baixo"
            id="bottom"
            name="bottom"
            type="text"
            value={formData.bottom ? formData.bottom : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, bottom: event.target.value }))}
          />
          <Textarea
            label="Observações"
            id="desc"
            name="desc"
            type="text"
            value={formData.desc ? formData.desc : ''}
            onChange={(event) => setFormData((prevState) => ({ ...prevState, desc: event.target.value }))}
          />
          <Button type="submit">
            Cadastrar cliente
          </Button>
        </form>
      </Wrapper>
    </>
  );
}

export default CreateCustomer;
