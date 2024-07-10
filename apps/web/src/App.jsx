import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TabsLayout } from './components/TabsLayout/TabsLayout';
import { PrivateTemplate } from './components/PrivateTemplate';
import { Login } from './pages/Login';
import { Financial } from './pages/Financial';
import { Settings } from './pages/Settings';
import { Accounts } from './pages/Accounts';
import { AccountsNew } from './pages/AccountsNew';
import { Create } from './pages/Create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateTemplate />,
    children: [
      {
        index: '/',
        element: <TabsLayout />,
        children: [
          {
            index: true,
            element: <Financial />,
          },
          {
            path: 'setting',
            element: <Settings />,
          },
          {
            path: 'accounts',
            element: <Accounts />,
          },
        ],
      },
      {
        path: 'account/new',
        element: <AccountsNew />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create',
    element: <Create />,
  },
]);

export const App = () => <RouterProvider router={router} />;

export default App;
