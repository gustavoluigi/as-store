/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';

import Private from '../../../layout/Private';
import CustomersService from '../../../services/CustomersService';
import { triggerToast, Toast } from '../../../utils/triggerToast';
import { Button, ButtonFloat, EditIcon } from './styles';
import { formatPhone, formatCep } from '../../../utils';
import { formatCpf } from '../../../utils/formatCpf';

function ShowCustomer() {
  const navigate = useNavigate();
  const [enableEdit, setEnableEdit] = useState(false);
  const [customer, setCustomer] = useState({
    id: 0,
    name: '',
    phone: '',
    address: '',
    zipcode: '',
    birthday: '',
    cpf: '',
    shoes: '',
    top: '',
    bottom: '',
    desc: '',
  });
  const { id } = useParams();

  const getCustomer = async () => {
    const customerDetails = await CustomersService.getCustomer(id);

    setCustomer(customerDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CustomersService.editCustomer(id, customer).then(triggerToast('success', 'Cliente editado com sucesso'));
    setEnableEdit(false);
  };

  const handleEnableEdit = () => {
    setEnableEdit(true);
  };

  const handleDelete = async () => {
    await CustomersService.deleteCustomer(id)
      .then(triggerToast('error', 'Cliente deletado'))
      .finally(() => {
        setTimeout(() => {
          navigate('/clientes', { replace: true });
        }, 2000);
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <Private>
      <Toast />
      <ButtonFloat danger onClick={handleDelete}>
        <EditIcon />
        Deletar cliente
      </ButtonFloat>
      <ButtonFloat onClick={handleEnableEdit}>
        <EditIcon />
        Editar cliente
      </ButtonFloat>
      <PageTitle>{customer.name}</PageTitle>
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <Input
            label="Nome"
            id="name"
            name="name"
            type="text"
            readOnly={!enableEdit}
            value={customer.name ? customer.name : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, name: event.target.value }))}
          />
          <Input
            label="Telefone"
            id="phone"
            name="phone"
            type="text"
            readOnly={!enableEdit}
            value={customer.phone ? customer.phone : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, phone: formatPhone(event.target.value) }))}
            maxLength="15"
          />
          <Input
            label="Endereço"
            id="address"
            name="address"
            type="text"
            readOnly={!enableEdit}
            value={customer.address ? customer.address : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, address: event.target.value }))}
          />
          <Input
            label="CEP"
            id="zipcode"
            name="zipcode"
            type="text"
            readOnly={!enableEdit}
            value={customer.zipcode ? customer.zipcode : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, zipcode: formatCep(event.target.value) }))}
            maxLength="9"
          />
          <Input
            label="Data de nascimento"
            id="birthday"
            name="birthday"
            type="date"
            readOnly={!enableEdit}
            value={customer.birthday ? customer.birthday : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, birthday: event.target.value }))}
          />
          <Input
            label="CPF"
            id="cpf"
            name="cpf"
            type="text"
            readOnly={!enableEdit}
            value={customer.cpf ? customer.cpf : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, cpf: formatCpf(event.target.value) }))}
            maxLength="14"
          />
          <Input
            label="Tamanho do sapato"
            id="shoes"
            name="shoes"
            type="text"
            readOnly={!enableEdit}
            value={customer.shoes ? customer.shoes : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, shoes: event.target.value }))}
          />
          <Input
            label="Tamanho da parte de cima"
            id="top"
            name="top"
            type="text"
            readOnly={!enableEdit}
            value={customer.top ? customer.top : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, top: event.target.value }))}
          />
          <Input
            label="Tamanho da parte de baixo"
            id="bottom"
            name="bottom"
            type="text"
            readOnly={!enableEdit}
            value={customer.bottom ? customer.bottom : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, bottom: event.target.value }))}
          />
          <Textarea
            label="Observações"
            id="desc"
            name="desc"
            type="text"
            readOnly={!enableEdit}
            value={customer.desc ? customer.desc : ''}
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, desc: event.target.value }))}
          />
          {enableEdit && <Button type="submit">Salvar</Button>}
        </form>
      </Wrapper>
    </Private>
  );
}

export default ShowCustomer;
