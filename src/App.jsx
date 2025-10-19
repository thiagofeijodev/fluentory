import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { TabsLayout } from './components/TabsLayout/TabsLayout';
import { PrivateTemplate } from './components/PrivateTemplate';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Create } from './pages/Create';
import { Flashcards } from './pages/Flashcards';

const basename = window.location.pathname.includes('/fluentory/') ? '/fluentory' : '/';

const router = createBrowserRouter(
  [
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
              element: <Home />,
            },
            {
              path: 'setting',
              element: <Settings />,
            },
          ],
        },
        {
          path: 'flashcards',
          element: <Flashcards />,
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
  ],
  { basename },
);

export const App = () => <RouterProvider router={router} />;

export default App;
