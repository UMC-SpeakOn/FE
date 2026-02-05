import LeftArrow from '@/assets/images/icons/left-arrow.svg';
import useNavigation from '@/hooks/useNavigation';

interface PrevNavbarProps {
  title: string;
  path?: string;
  back?: boolean;
}

const PrevNavbar = ({ title, path, back }: PrevNavbarProps) => {
  const { navigateTo, navigateBack } = useNavigation();

  const handleClick = () => {
    if (back) {
      navigateBack();
    } else if (path) {
      navigateTo(path);
    }
  };
  return (
    <nav className="relative w-full flex items-center px-[2.4rem] my-[0.8rem]">
      <button onClick={handleClick}>
        <img src={LeftArrow} alt="left" className="w-[0.9rem]" />
      </button>

      <p className="absolute left-1/2 -translate-x-1/2 font-semibold text-[1.6rem] leading-none text-white">
        {title}
      </p>
    </nav>
  );
};

export default PrevNavbar;
