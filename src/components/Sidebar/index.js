/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import {
  Container,
  HiOutlineAdjustmentsStyled,
  HiOutlineDocumentTextStyled,
  HiOutlineShoppingBagStyled,
  HiOutlineShoppingCartStyled,
  HiOutlineUserGroupStyled,
  Img,
  Item,
  List,
} from './styles';
import asLogo from '../../assets/images/as-logo.png';

function Sidebar() {
  return (
    <Container>
      <Img src={asLogo} alt="Adriana Sotto" />
      <List className="">
        <Item className="group">
          <Link to="/dashboard" href="#">
            <HiOutlineAdjustmentsStyled />
            <span>Dashboard</span>
          </Link>
        </Item>
        <Item className="group">
          <Link to="/pedidos" href="#">
            <HiOutlineShoppingCartStyled />
            <span>Pedidos</span>
          </Link>
        </Item>
        <Item className="group">
          <Link to="/teste" href="#">
            <HiOutlineUserGroupStyled />
            <span>Clientes</span>
          </Link>
        </Item>
        <Item className="group">
          <Link to="/teste" href="#">
            <HiOutlineShoppingBagStyled />
            <span>Produtos</span>
          </Link>
        </Item>
        <Item className="group">
          <Link to="/teste" href="#">
            <HiOutlineDocumentTextStyled />
            <span>Relatórios</span>
          </Link>
        </Item>
      </List>
    </Container>
  );
}

export default Sidebar;
