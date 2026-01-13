import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Spinner from '@/components/Spinner/Spinner';
import RootLayout from '@/layouts/RootLayout';

import HomePage from '@/pages/home/Home';
import MyRolePage from '@/pages/my-role/My-Role';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Spinner />}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'my-role',
        element: <MyRolePage />,
      },
    ],
  },
]);

export default router;
