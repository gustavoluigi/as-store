/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  Container,
  HiMenuAlt1Styled,
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
  MobileNav,
} from './styles';
import asLogo from '../../assets/images/as-logo.png';
import useMedia from '../../hooks/useMedia';

function Sidebar() {
  const isMobile = useMedia(['(max-width: 768px)'], [true]);
  const [isActiveNavMobile, setIsActiveNavMobile] = useState(false);

  const onClickNavMobile = () => {
    setIsActiveNavMobile(!isActiveNavMobile);
  };

  return (
    <Container>
      <Img src={asLogo} alt="Adriana Sotto" />
      <List className="">
        {isMobile && (
          <Item className="group">
            <NavLink to="/dashboard" onClick={onClickNavMobile}>
              <HiMenuAlt1Styled />
              <span>Menu</span>
            </NavLink>
          </Item>
        )}
        <MobileNav show={isActiveNavMobile} isMobile={isMobile}>
          <Item className="group">
            <NavLink to="/dashboard">
              <HiOutlineAdjustmentsStyled />
              <span>Dashboard</span>
            </NavLink>
          </Item>
          <Item className="group">
            <NavLink to="/vendas">
              <HiOutlineShoppingCartStyled />
              <span>Vendas</span>
            </NavLink>
          </Item>
          <Item className="group">
            <NavLink to="/clientes">
              <HiOutlineUserGroupStyled />
              <span>Clientes</span>
            </NavLink>
          </Item>
          <Item className="group">
            <NavLink to="/produtos">
              <HiOutlineShoppingBagStyled />
              <span>Produtos</span>
            </NavLink>
          </Item>
          <Item className="group">
            <NavLink to="/relatorios">
              <HiOutlineDocumentTextStyled />
              <span>Relatórios</span>
            </NavLink>
          </Item>
          <Item className="group">
            <NavLink to="/metas">
              <HiOutlinePresentationChartLineStyled />
              <span>Metas</span>
            </NavLink>
          </Item>
          <Item className="group">
            <NavLink to="/delivery">
              <HiShoppingBagStyled />
              <span>Delivery</span>
            </NavLink>
          </Item>
        </MobileNav>
      </List>
    </Container>
  );
}

export default Sidebar;
