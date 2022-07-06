/* eslint-disable max-len */
import { useState } from 'react';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import PageTitle from '../../../components/PageTitle';
import { useCreateCustomer } from '../../../hooks/useCustomer';
import { formatCep, formatPhone } from '../../../utils';
import { formatCpf } from '../../../utils/formatCpf';
import { Toast } from '../../../utils/triggerToast';
import { Button, Wrapper } from './styles';

function CreateCustomer() {
  const [formData, setFormData] = useState({});
  const { handleCreate } = useCreateCustomer(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreate();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setFormData({ ...formData, phone: formatPhone(value) });
    } else if (name === 'zipcode') {
      setFormData({ ...formData, zipcode: formatCep(value) });
    } else if (name === 'cpf') {
      setFormData({ ...formData, cpf: formatCpf(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
            onChange={handleChange}
          />
          <Input
            label="E-mail"
            id="email"
            name="email"
            type="text"
            value={formData.email ? formData.email : ''}
            onChange={handleChange}
          />
          <Input
            label="Telefone"
            id="phone"
            name="phone"
            type="text"
            value={formData.phone ? formData.phone : ''}
            onChange={handleChange}
            maxLength="15"
          />
          <Input
            label="Endereço"
            id="address"
            name="address"
            type="text"
            value={formData.address ? formData.address : ''}
            onChange={handleChange}
          />
          <Input
            label="CEP"
            id="zipcode"
            name="zipcode"
            type="text"
            value={formData.zipcode ? formData.zipcode : ''}
            onChange={handleChange}
            maxLength="9"
          />
          <Input
            label="Data de nascimento"
            id="birthday"
            name="birthday"
            type="date"
            value={formData.birthday ? formData.birthday : ''}
            onChange={handleChange}
          />
          <Input
            label="CPF"
            id="cpf"
            name="cpf"
            type="text"
            value={formData.cpf ? formData.cpf : ''}
            onChange={handleChange}
            maxLength="14"
          />
          <Input
            label="Tamanho do sapato"
            id="shoes"
            name="shoes"
            type="number"
            value={formData.shoes ? formData.shoes : ''}
            onChange={handleChange}
          />
          <Input
            label="Tamanho da parte de cima"
            id="top"
            name="top"
            type="text"
            value={formData.top ? formData.top : ''}
            onChange={handleChange}
          />
          <Input
            label="Tamanho da parte de baixo"
            id="bottom"
            name="bottom"
            type="text"
            value={formData.bottom ? formData.bottom : ''}
            onChange={handleChange}
          />
          <Textarea
            label="Observações"
            id="desc"
            name="desc"
            type="text"
            value={formData.desc ? formData.desc : ''}
            onChange={handleChange}
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
