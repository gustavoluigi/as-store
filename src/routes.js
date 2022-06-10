import { Outlet, useRoutes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import CreateCustomer from './pages/Customers/Create';
import Customers from './pages/Customers/List';
import ShowCustomer from './pages/Customers/Show';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/Orders/Create';
import EditOrder from './pages/Orders/Edit';
import Orders from './pages/Orders/List';
import Order from './pages/Orders/Show';
import CreateProduct from './pages/Products/Create';
import Products from './pages/Products/List';
import Product from './pages/Products/Show';
import Reports from './pages/Reports';
import MonthStatsPDF from './pages/Reports/MonthStatsPDF';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'dashboard',
      element: <Dashboard />,
    },
    {
      path: 'vendas',
      element: <Orders />,
    },
    {
      path: 'vendas/:id',
      element: <Order />,
    },
    {
      path: 'vendas/criar',
      element: <CreateOrder />,
    },
    {
      path: 'vendas/:id/editar',
      element: <EditOrder />,
    },
    {
      path: 'produtos',
      element: <Products />,
    },
    {
      path: 'produtos/criar',
      element: <CreateProduct />,
    },
    {
      path: 'produtos/:id',
      element: <Product />,
    },
    {
      path: 'clientes',
      element: <Customers />,
    },
    {
      path: 'clientes/criar',
      element: <CreateCustomer />,
    },
    {
      path: 'clientes/:id',
      element: <ShowCustomer />,
    },
    {
      path: 'relatorios',
      element: <Reports />,
    },
    {
      path: 'relatorio-mensal/:month/:year',
      element: <MonthStatsPDF />,
    },
  ]);
}
