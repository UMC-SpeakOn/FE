import { matchPath, Outlet, useLocation, useMatch } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';

const RootLayout = () => {
  const { pathname } = useLocation();

  const HIDE_NAV_PATHS = [
    '/my-speak/result',
    '/my-speak/interview',
    '/my-report/:id',
  ];

  const hideNavbar = HIDE_NAV_PATHS.some((path) =>
    matchPath({ path, end: false }, pathname),
  );

  const isSplash = useMatch('/');

  if (isSplash) {
    return <Outlet />;
  }

  return (
    <div className="pageContainer">
      <div className="scrollArea scroll">
        <div className="screenSection">
          <Header />
          {!hideNavbar && <Navbar />}

          <main className="mainSection">
            <Outlet />
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
