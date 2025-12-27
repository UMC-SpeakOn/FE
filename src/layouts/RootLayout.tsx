import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="pageContainer">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
