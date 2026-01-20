import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Spinner from '@/components/Spinner/Spinner';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/home/Home';
import MyRolePage from '@/pages/my-role/My-Role';
import InterviewPage from '@/pages/my-speak/interview/InterviewPage';
import InterviewResultPage from '@/pages/my-speak/interview/InterviewResultPage';
import MySpeakPage from '@/pages/my-speak/My-Speak';
import MySpeakSettingPage from '@/pages/my-speak/Setting/Setting';

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
        path: 'my-speak',
        element: <MySpeakPage />,
      },
      {
        path: 'my-speak/setting',
        element: <MySpeakSettingPage />,
      },
      {
        path: 'my-speak/interview',
        element: <InterviewPage />,
      },
      {
        path: 'my-speak/interview/result',
        element: <InterviewResultPage />,
      },
    ],
  },
]);

export default router;
