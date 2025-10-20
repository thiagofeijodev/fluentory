import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import { TabsLayout } from './components/TabsLayout/TabsLayout';
import { PrivateTemplate } from './components/PrivateTemplate';
import { Login } from './pages/Login';
import { WordRelationshipPage } from './pages/WordRelationshipPage';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { Create } from './pages/Create';
import { Flashcards } from './pages/Flashcards';
import { ErrorPage } from './pages/ErrorPage';

const basename = window.location.pathname.includes('/fluentory/') ? '/fluentory' : '/';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/app',
      element: <PrivateTemplate />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
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
        {
          path: 'words',
          element: <WordRelationshipPage />,
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
