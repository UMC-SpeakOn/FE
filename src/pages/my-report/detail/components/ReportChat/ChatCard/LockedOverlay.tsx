import Lock from '@/assets/images/icons/lock.svg';
import RightArrow from '@/assets/images/icons/right-arrow.svg';
import useNavigation from '@/hooks/useNavigation';

const LockedOverlay = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
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

        <button
          onClick={() => navigateTo('/my-profile')}
          className="flex items-center gap-[1.1rem] border-b border-white text-[1.4rem] font-medium"
        >
          구독하러 가기
          <img src={RightArrow} alt="right-arrow" className="w-[0.5rem]" />
        </button>
      </div>
    </div>
  );
};

export default LockedOverlay;
