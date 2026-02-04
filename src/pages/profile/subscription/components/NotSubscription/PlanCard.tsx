import RightArrow from '@/assets/images/icons/right-arrow.svg';
import useNavigation from '@/hooks/useNavigation';
import { paymentsData } from '@/mocks/subscribeData';

const PlanCard = () => {
  const { navigateTo } = useNavigation();

  const handlePayClick = () => {
    navigateTo('/profile/payments');
  };

  return (
    <div className="w-full px-[2.1rem] pt-[2.1rem] pb-[2.5rem] rounded-[1rem] border-[0.1rem] border-gray-100">
      <p className="font-bold text-[1.5rem] text-gray-400 leading-none">
        {paymentsData.name}
      </p>

      <div className="flex gap-[0.5rem] mt-[2.3rem] items-end">
        <p className="font-bold text-[2.6rem] leading-none text-purple-700">
          ₩ {paymentsData.price.toLocaleString()}
        </p>
        <p className="font-bold text-[1.9rem] leading-none text-gray-300">
          /월
        </p>
      </div>

      <p className="font-bold text-[1.5rem] leading-none text-black mt-[0.9rem]">
        {paymentsData.explain}
      </p>

      <button
        className="w-full py-[1.4rem] bg-purple-700 rounded-[1rem] mt-[3.1rem] flex items-center gap-[1.3rem] justify-center"
        onClick={handlePayClick}
      >
        <p className="font-semibold text-[1.6rem] leading-none text-white">
          기록 저장 시작하기
        </p>
        <img src={RightArrow} alt="right" className="text-white" />
      </button>
    </div>
  );
};

export default PlanCard;
