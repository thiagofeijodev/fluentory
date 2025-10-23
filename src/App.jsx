import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
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

export const App = () => {
  useEffect(() => {
    // Register service worker with update handling
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, prompt user to refresh
                  if (window.confirm('New version available! Refresh to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });

      // Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          window.location.reload();
        }
      });
    }
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
