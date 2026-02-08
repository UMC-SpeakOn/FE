import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProfileModal from '@/components/Modal/ProfileModal';
import PrevNavbar from '@/components/Navbar/PrevNavbar';

import NotSubscription from './components/NotSubscription/NotSubscription';
import Pay from './components/Pay';
import PlanCard from './components/PlanCard';

interface SubscriptionLocationState {
  isSubscribed?: boolean;
  expiredAt?: string | null;
}

const Subscription = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { isSubscribed = false, expiredAt = null } =
    (location.state as SubscriptionLocationState) ?? {};

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    console.log('구독 해지');

    setIsOpen(false);
  };

  return (
    <>
      <PrevNavbar title="구독" back />

      <div className="white-pageContainer pr-[1.462rem]">
        <div className="flex flex-col gap-[3.6rem]">
          {isSubscribed ? (
            <>
              <PlanCard expiredAt={expiredAt} />
              <Pay />

              <button
                onClick={handleOpenModal}
                className="w-full py-[1.4rem] rounded-[1rem] bg-gray-50 font-semibold text-gray-300 text-[1.6rem] mt-[17rem]"
              >
                구독 해지하기
              </button>
            </>
          ) : (
            <NotSubscription />
          )}
        </div>
      </div>

      {isOpen && (
        <ProfileModal
          title="정말 해지하시겠어요?"
          descriptions={[
            '구독을 해지하면 다음 결제일부터는\n요금이 청구되지 않아요',
            '기존 대화는 열람 가능하지만\n새 대화 저장에는 구독이 필요해요',
          ]}
          cancelText="취소"
          confirmText="해지하기"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          onClose={handleCancel}
        />
      )}
    </>
  );
};

export default Subscription;
