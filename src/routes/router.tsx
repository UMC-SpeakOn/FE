import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Spinner from '@/components/Spinner/Spinner';
import Splash from '@/components/Splash/Splash';
import RootLayout from '@/layouts/RootLayout';
import LoginPage from '@/pages/login/Login';
import MyReportDetailPage from '@/pages/my-report/detail/Detail';
import MyReportPage from '@/pages/my-report/report/MyReport';
import MyRolePage from '@/pages/my-role/My-Role';
import InterviewPage from '@/pages/my-speak/interview/InterviewPage';
import MySpeakResultPage from '@/pages/my-speak/result/Result';
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
      { index: true, element: <Splash /> },
      {
        path: 'login',
        element: <LoginPage />,
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
        path: 'my-speak/interview',
        element: <InterviewPage />,
      },
      {
        path: 'my-speak/result',
        element: <MySpeakResultPage />,
      },
      {
        path: 'my-report',
        element: <MyReportPage />,
      },
      {
        path: 'my-report/:id',
        element: <MyReportDetailPage />,
      },
    ],
  },
]);

export default router;
