import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../../components/Form/Input';
import Textarea from '../../../components/Form/Textarea';
import { Wrapper } from '../../../components/Layout/Wrapper';
import PageTitle from '../../../components/PageTitle';
import { Toast } from '../../../utils/triggerToast';
import { Button, ButtonFloat, EditIcon } from './styles';
import { formatPhone, formatCep, formatCpf } from '../../../utils';
import BackButton from '../../../components/BackButton';
import Table from '../../../components/Table/index';
import { useDeleteCustomer, useEditCustomer, useGetCustomer } from '../../../hooks/useCustomer';

function ShowCustomer() {
  const { id: customerId } = useParams();
  const navigate = useNavigate();
  const handleDelete = useDeleteCustomer(customerId);
  const handleEdit = useEditCustomer();
  const tableHeads = [
    'Data',
    'Qt. Produtos',
    'Subtotal',
    'Desconto',
    'Total',
    'Obs',
    'Pagamento',
  ];
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState({});

  const {
    customer, restCustomer, orders, restOrders, isLoading, isError,
  } = useGetCustomer(customerId, setFields);

  if (isLoading) {
    return <div>Aguarde...</div>;
  }
  if (isError) {
    return (
      <div>Erro! {restCustomer.isError.message
        ? restCustomer.isError.message
        : restOrders.isError.message}
      </div>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'phone') {
      setFields({ ...fields, phone: formatPhone(value) });
    } else if (name === 'zipcode') {
      setFields({ ...fields, zipcode: formatCep(value) });
    } else if (name === 'cpf') {
      setFields({ ...fields, cpf: formatCpf(value) });
    } else {
      setFields({ ...fields, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEdit(fields);
  };

  const handleEnableEdit = () => {
    setIsEditing(true);
  };

  const handleClickDelete = () => {
    handleDelete();
  };

  const handleTableClick = (orderId) => {
    navigate(`/vendas/${orderId}`);
  };

  return (
    <>
      <Toast />
      <BackButton />
      <ButtonFloat danger onClick={handleClickDelete}>
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
            readOnly={!isEditing}
            value={fields.name ? fields.name : ''}
            onChange={(event) => handleChange(event)}
          />
          <Input
            label="Email"
            id="email"
            name="email"
            type="text"
            readOnly={!isEditing}
            value={fields.email ? fields.email : ''}
            onChange={(event) => handleChange(event)}
          />
          <Input
            label="Telefone"
            id="phone"
            name="phone"
            type="text"
            readOnly={!isEditing}
            value={fields.phone ? fields.phone : ''}
            onChange={(event) => handleChange(event)}
            maxLength="15"
          />
          <Input
            label="Endereço"
            id="address"
            name="address"
            type="text"
            readOnly={!isEditing}
            value={fields.address ? fields.address : ''}
            onChange={(event) => handleChange(event)}
          />
          <Input
            label="CEP"
            id="zipcode"
            name="zipcode"
            type="text"
            readOnly={!isEditing}
            value={fields.zipcode ? fields.zipcode : ''}
            onChange={(event) => handleChange(event)}
            maxLength="9"
          />
          <Input
            label="Data de nascimento"
            id="birthday"
            name="birthday"
            type="date"
            readOnly={!isEditing}
            value={fields.birthday ? fields.birthday : ''}
            onChange={(event) => handleChange(event)}
          />
          <Input
            label="CPF"
            id="cpf"
            name="cpf"
            type="text"
            readOnly={!isEditing}
            value={fields.cpf ? fields.cpf : ''}
            onChange={(event) => handleChange(event)}
            maxLength="14"
          />
          <Input
            label="Tamanho do sapato"
            id="shoes"
            name="shoes"
            type="number"
            readOnly={!isEditing}
            value={fields.shoes ? fields.shoes : ''}
            onChange={(event) => handleChange(event)}
          />
          <Input
            label="Tamanho da parte de cima"
            id="top"
            name="top"
            type="text"
            readOnly={!isEditing}
            value={fields.top ? fields.top : ''}
            onChange={(event) => handleChange(event)}
          />
          <Input
            label="Tamanho da parte de baixo"
            id="bottom"
            name="bottom"
            type="text"
            readOnly={!isEditing}
            value={fields.bottom ? fields.bottom : ''}
            onChange={(event) => handleChange(event)}
          />
          <Textarea
            label="Observações"
            id="desc"
            name="desc"
            type="text"
            readOnly={!isEditing}
            value={fields.desc ? fields.desc : ''}
            onChange={(event) => handleChange(event)}
          />
          {isEditing && <Button type="submit">Salvar</Button>}
        </form>
        <h3>Vendas</h3>
        <Table tableHeads={tableHeads} tableRows={orders} handleClick={handleTableClick} />
      </Wrapper>
    </>
  );
}

export default ShowCustomer;
