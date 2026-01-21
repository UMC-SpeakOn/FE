import NavPurple from '@/assets/images/icons/nav-purple.svg';

const NAV_ITEMS = [
  { w: 'w-[3.408rem]', pos: '-top-10 -left-18' },
  { w: 'w-[1.95rem]', pos: 'top-8 -left-25' },
  { w: 'w-[1.441rem]', pos: 'top-18 -left-5' },
  { w: 'w-[1.62rem]', pos: '-top-5 -right-10' },
  { w: 'w-[3.068rem]', pos: 'top-7 -right-23' },
] as const;

const Header = () => {
  return (
    <div className="w-full flex justify-center mt-[9.858rem] mb-[8.482rem]">
      <p className="relative font-bold text-[2.4rem] text-white">
        수고하셨어요!
        {NAV_ITEMS.map((item, idx) => (
          <img
            key={idx}
            src={NavPurple}
            alt="nav"
            className={`absolute ${item.w} ${item.pos}`}
          />
        ))}
      </p>
    </div>
  );
};

export default Header;
