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
import AccountPage from '@/pages/profile/account/Account';
import PaymentsPage from '@/pages/profile/payments/Payments';
import PaymentsFailPage from '@/pages/profile/payments/PaymentsFail';
import SubscriptionPage from '@/pages/profile/subscription/Subscription';

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
        children: [
          { index: true, element: <LoginPage /> },
          {
            path: 'oauth2/code/:provider',
            element: <LoginPage />,
          },
        ],
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
        path: 'my-speak/interview/:sessionId',
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
      {
        path: 'profile',
        children: [
          { path: 'account', element: <AccountPage /> },
          { path: 'subscription', element: <SubscriptionPage /> },
          { path: 'payments', element: <PaymentsPage /> },
          { path: 'payments/fail', element: <PaymentsFailPage /> },
        ],
      },
    ],
  },
]);

export default router;
