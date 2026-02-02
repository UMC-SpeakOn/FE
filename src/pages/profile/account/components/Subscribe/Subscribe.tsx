import RightArrow2 from '@/assets/images/icons/right-arrow2.svg';
import useNavigation from '@/hooks/useNavigation';
import { paymentsData, subscribeData } from '@/mocks/subscribeData';

import NotSubscribe from './NotSubscribe';
import SubscribeCard from './SubscribeCard';

const Subscribe = () => {
  const { navigateTo } = useNavigation();

  const handleSubscribeClick = () => {
    navigateTo('/profile/subscribe');
  };

  return (
    <div className="w-full flex flex-col gap-[0.997rem]">
      <div className="w-full flex justify-between items-center">
        <p className="font-bold text-black text-[1.9rem] leading-none">구독</p>
        <button
          className="flex items-center gap-[0.7rem]"
          onClick={handleSubscribeClick}
        >
          <p className="text-[1.3rem] font-semibold text-gray-300 leading-none">
            자세히 보기
          </p>
          <img src={RightArrow2} alt="right" className="w-[1.2rem] h-[1rem]" />
        </button>
      </div>

      {subscribeData.isSubscribed ? (
        <SubscribeCard data={paymentsData} />
      ) : (
        <NotSubscribe />
      )}
    </div>
  );
};

export default Subscribe;
