import Lock from '@/assets/images/icons/lock.svg';
import RightArrow from '@/assets/images/icons/right-arrow.svg';
import useNavigation from '@/hooks/useNavigation';

const LockedOverlay = () => {
  const { navigateTo } = useNavigation();

  const handleProfileClick = () => {
    navigateTo('/my-profile');
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/70">
      <div className="flex flex-col items-center text-white">
        <img
          src={Lock}
          alt="lock"
          className="w-[4.1rem] h-[4.1rem] mb-[1.02rem]"
        />
        <p className="text-center text-[1.5rem] font-bold leading-[1.4] mb-[2.4rem]">
          구독 후 대화 로그를
          <br />
          확인할 수 있어요
        </p>

        <div
          className="group flex flex-col items-center gap-[0.3rem] border-b-[0.1rem] border-white px-[0.3rem] cursor-pointer"
          onClick={handleProfileClick}
        >
          <span className="flex items-center gap-[1.1rem] text-[1.4rem] font-medium text-white">
            구독하러 가기
            <img src={RightArrow} alt="right-arrow" className="w-[0.5rem]" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default LockedOverlay;
