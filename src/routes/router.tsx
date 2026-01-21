import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Spinner from '@/components/Spinner/Spinner';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/home/Home';
import MyRolePage from '@/pages/my-role/My-Role';
import MySpeakSettingPage from '@/pages/my-speak/setting/Setting';

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
      {
        path: 'my-speak/setting',
        element: <MySpeakSettingPage />,
      },
    ],
  },
]);

export default router;
