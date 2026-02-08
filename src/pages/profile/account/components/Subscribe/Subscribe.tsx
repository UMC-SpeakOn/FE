import RightArrow2 from '@/assets/images/icons/right-arrow2.svg';
import useNavigation from '@/hooks/useNavigation';
import { paymentsData } from '@/mocks/subscribeData';
import type { UserApi } from '@/types/api/account.type';

import NotSubscribe from './NotSubscribe';
import SubscribeCard from './SubscribeCard';

interface SubscribeProps {
  user: UserApi;
}

const Subscribe = ({ user }: SubscribeProps) => {
  const { navigateTo } = useNavigation();
  const isSubscribed = user.isSubscribed === true;

  const handleSubscribeClick = () => {
    navigateTo('/profile/subscription');
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

      {isSubscribed ? (
        <SubscribeCard
          data={paymentsData}
          nextPaymentDate={user.subscriptionExpiredAt}
          isCancelled={user.isSubscriptionCancelled}
        />
      ) : (
        <NotSubscribe />
      )}
    </div>
  );
};

export default Subscribe;
