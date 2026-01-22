import { useLocation } from 'react-router-dom';

import NavIcon from '@/assets/images/icons/nav.svg';
import { getNavbarLabel } from '@/utils/navbar/getNavbarLabel';

const Navbar = () => {
  const { pathname } = useLocation();
  const label = getNavbarLabel(pathname);

  return (
    <nav className="relative w-full flex justify-center items-center">
      <div className="relative">
        <div className="px-[1.6rem] py-[0.7rem] rounded-[1.6rem] bg-purple-700 text-white font-bold text-[1.8rem] leading-none">
          {label}
        </div>
        <img
          src={NavIcon}
          alt="nav"
          className="absolute -top-2 -left-2.5 w-[1.925rem]"
        />
      </div>

      <button className="absolute w-[1.8rem] h-[1.6rem] left-[1.7rem] flex flex-col justify-between">
        <div className="w-full h-1 bg-white rounded-full" />
        <div className="w-full h-1 bg-white rounded-full" />
        <div className="w-full h-1 bg-white rounded-full" />
      </button>
    </nav>
  );
};

export default Navbar;
