import { Outlet, useLocation } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const RootLayout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === '/my-speak/interview';

  return (
    <div className="pageContainer scroll">
      {!hideHeader && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
