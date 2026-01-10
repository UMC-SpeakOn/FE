import { Outlet } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const RootLayout = () => {
  return (
    <div className="pageContainer">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
