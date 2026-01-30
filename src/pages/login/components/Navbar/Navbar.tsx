import LeftArrow from '@/assets/images/icons/left-arrow.svg';

const Navbar = () => {
  return (
    <div className="w-full cursor-pointer mt-[2.3rem] ml-[0.8rem]">
      <img src={LeftArrow} alt="left-arrow" className="w-[0.9rem] h-[1.7rem]" />
    </div>
  );
};

export default Navbar;
