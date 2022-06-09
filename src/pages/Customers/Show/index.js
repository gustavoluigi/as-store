/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';

import Private from '../../../layout/Private';
import CustomersService from '../../../services/CustomersService';
import { triggerToast, Toast } from '../../../utils/triggerToast';
import { Button, ButtonFloat, EditIcon } from './styles';

function ShowCustomer() {
  const navigate = useNavigate();
  const [enableEdit, setEnableEdit] = useState(false);
  const [customer, setCustomer] = useState({
    id: 0,
    name: '',
    phone: '',
    address: '',
    zipcode: '',
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
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, phone: event.target.value }))}
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
            onChange={(event) => setCustomer((prevState) => ({ ...prevState, zipcode: event.target.value }))}
          />
          {enableEdit && <Button type="submit">Salvar</Button>}
        </form>
      </Wrapper>
    </Private>
  );
}

export default ShowCustomer;
