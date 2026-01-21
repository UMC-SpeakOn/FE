import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const RootLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/my-speak/interview';

  return (
    <div className="pageContainer">
      <div className="scrollArea scroll">
        <div className="screenSection">
          {!hideHeader && <Header />}
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
