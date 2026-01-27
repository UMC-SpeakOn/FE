import { matchPath, Outlet, useLocation } from 'react-router-dom';

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
  ];

  const hideNavbar = HIDE_NAV_PATHS.some((path) =>
    matchPath({ path, end: false }, pathname),
  );

  return (
    <MenuProvider>
      <div className="pageContainer">
        <div className="scrollArea scroll">
          <div className="screenSection relative overflow-hidden">
            <Menu />
            <Header />
            {!hideNavbar && <Navbar />}

            <main className="mainSection">
              <Outlet />
            </main>
          </div>

          <Footer />
        </div>
      </div>
    </MenuProvider>
  );
};

export default RootLayout;
