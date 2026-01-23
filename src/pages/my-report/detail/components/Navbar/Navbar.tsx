import LeftArrow from '@/assets/images/icons/left-arrow.svg';
import useNavigation from '@/hooks/useNavigation';

const Navbar = () => {
  const { navigateTo } = useNavigation();

  const handleMyreportClick = () => {
    navigateTo('/my-report');
  };

  return (
    <nav className="relative w-full flex items-center px-[2.4rem] my-[0.8rem]">
      <button onClick={handleMyreportClick}>
        <img src={LeftArrow} alt="left" className="w-[0.9rem]" />
      </button>

      {/* 추후 동적 변경으로 수정 */}
      <p className="absolute left-1/2 -translate-x-1/2 font-semibold text-[1.6rem] leading-none text-white">
        마케팅 직무 면접
      </p>
    </nav>
  );
};

export default Navbar;
