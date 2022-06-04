import { Outlet, useRoutes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import CreateOrder from './pages/Orders/Create';
import EditOrder from './pages/Orders/Edit';
import Orders from './pages/Orders/List';
import Order from './pages/Orders/Show';
import Products from './pages/Products/List';

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
      path: 'pedidos',
      element: <Orders />,
    },
    {
      path: 'pedidos/:id',
      element: <Order />,
    },
    {
      path: 'pedidos/criar',
      element: <CreateOrder />,
    },
    {
      path: 'pedidos/:id/editar',
      element: <EditOrder />,
    },
    {
      path: 'produtos',
      element: <Products />,
    },
  ]);
}
