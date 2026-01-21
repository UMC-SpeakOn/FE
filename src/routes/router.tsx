import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Spinner from '@/components/Spinner/Spinner';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/home/Home';
import MyRolePage from '@/pages/my-role/My-Role';
import MySpeakResultPage from '@/pages/my-speak/result/Result';
import MySpeakSettingPage from '@/pages/my-speak/setting/Setting';
import InterviewPage from '@/pages/my-speak/interview/InterviewPage';

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
      {
        path: 'my-speak/result',
        element: <MySpeakResultPage />,
      },
      {
        path: 'my-speak/interview',
        element: <InterviewPage />,
      },
    ],
  },
]);

export default router;
