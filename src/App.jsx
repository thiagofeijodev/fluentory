import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AccountsNew } from 'pages/AccountsNew/AccountsNew';
import { Accounts } from 'pages/Accounts/Accounts';
import { Historic } from 'pages/Historic/Historic';
import { Settings } from 'pages/Settings/Settings';
import { Login } from 'pages/Login/Login';
import { Create } from 'pages/Create/Create';
import PrivateLayout from 'components/PrivateLayout';
import TabLayout from 'components/TabLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateLayout />,
    children: [
      {
        index: '/',
        element: <TabLayout />,
        children: [
          {
            index: true,
            element: <Historic />,
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

export const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
