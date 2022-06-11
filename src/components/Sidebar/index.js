/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom';
import {
  Container,
  HiOutlineAdjustmentsStyled,
  HiOutlineDocumentTextStyled,
  HiOutlinePresentationChartLineStyled,
  HiOutlineShoppingBagStyled,
  HiOutlineShoppingCartStyled,
  HiOutlineUserGroupStyled,
  HiShoppingBagStyled,
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
          <NavLink to="/dashboard" href="#">
            <HiOutlineAdjustmentsStyled />
            <span>Dashboard</span>
          </NavLink>
        </Item>
        <Item className="group">
          <NavLink to="/vendas" href="#">
            <HiOutlineShoppingCartStyled />
            <span>Vendas</span>
          </NavLink>
        </Item>
        <Item className="group">
          <NavLink to="/clientes" href="#">
            <HiOutlineUserGroupStyled />
            <span>Clientes</span>
          </NavLink>
        </Item>
        <Item className="group">
          <NavLink to="/produtos" href="#">
            <HiOutlineShoppingBagStyled />
            <span>Produtos</span>
          </NavLink>
        </Item>
        <Item className="group">
          <NavLink to="/relatorios" href="#">
            <HiOutlineDocumentTextStyled />
            <span>Relatórios</span>
          </NavLink>
        </Item>
        <Item className="group">
          <NavLink to="/metas" href="#">
            <HiOutlinePresentationChartLineStyled />
            <span>Metas</span>
          </NavLink>
        </Item>
        <Item className="group">
          <NavLink to="/delivery" href="#">
            <HiShoppingBagStyled />
            <span>Delivery</span>
          </NavLink>
        </Item>
      </List>
    </Container>
  );
}

export default Sidebar;
