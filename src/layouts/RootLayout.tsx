import { matchPath, Outlet, useLocation, useMatch } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Menu/Menu';
import Navbar from '@/components/Navbar/Navbar';
import { MenuProvider } from '@/contexts/MenuContext';

const RootLayout = () => {
  const { pathname } = useLocation();

  const HIDE_NAV_PATHS = [
    '/my-speak/result',
    '/my-speak/interview',
    '/my-report/:id',
    '/profile/subscription',
    '/profile/payments',
  ];

  const hideNavbar = HIDE_NAV_PATHS.some((path) =>
    matchPath({ path, end: false }, pathname),
  );

  const isSplash = useMatch('/');
  const isLogin = pathname.startsWith('/login');
  const isOnboarding = useMatch('/onboarding');

  if (isSplash || isLogin || isOnboarding) {
    return (
      <div className="pageContainer">
        <Outlet />
      </div>
    );
  }

  return (
    <MenuProvider>
      <div className="pageContainer">
        <div className="scrollArea scroll">
          <div className="screenSection relative overflow-hidden">
            <Header />
            {!hideNavbar && <Navbar />}

            <main className="mainSection">
              <Outlet />
            </main>

            {/* 메뉴 컴포넌트 */}
            <Menu />
          </div>

          <Footer />
        </div>
      </div>
    </MenuProvider>
  );
};

export default RootLayout;
