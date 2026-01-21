import { Outlet } from 'react-router-dom';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

const RootLayout = () => {
  return (
    <div className="pageContainer scroll">
      <div className="screenSection">
        <Header />
        <main className="mainSection">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default RootLayout;
