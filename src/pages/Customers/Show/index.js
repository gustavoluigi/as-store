/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Input from '../../../components/Form/Input';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';

import Private from '../../../layout/Private';
import { Button, ButtonFloat, EditIcon } from './styles';

function ShowCustomer() {
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
    await fetch('/_mock/customers.json')
      .then((res) => res.json())
      .then((json) => {
        setCustomer(json.filter((item) => item.id === parseInt(id, 10))[0]);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Cliente editado com sucesso', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setEnableEdit(false);
  };

  const handleEnableEdit = () => {
    setEnableEdit(true);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <Private>
      <ToastContainer theme="colored" />
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
