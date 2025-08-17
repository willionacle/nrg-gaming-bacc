import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './protected-route';
import { LobbyPage, LoginPage, TablePage } from '@/pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <LobbyPage />,
      },
      {
        path: 'table/:id',
        element: <TablePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
