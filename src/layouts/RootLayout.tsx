import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Navbar from '@/components/Navbar/Navbar';

const RootLayout = () => {
  const { pathname } = useLocation();

  const HIDE_NAV_PATHS = ['/my-speak/result', '/my-speak/interview'];

  const hideNavbar = HIDE_NAV_PATHS.some((path) => pathname.startsWith(path));

  return (
    <div className="pageContainer">
      <div className="scrollArea scroll">
        <div className="screenSection">
          {/* {!hideHeader && <Header />} */}
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
