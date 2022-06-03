import { useRoutes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders/List';
import Products from './pages/Products/List';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/pedidos',
      element: <Orders />,
    },
    {
      path: '/produtos',
      element: <Products />,
    },
  ]);
}
