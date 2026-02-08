import clsx from 'clsx';
import { useState } from 'react';

import ProfileModal from '@/components/Modal/ProfileModal';
import PrevNavbar from '@/components/Navbar/PrevNavbar';
import useNavigation from '@/hooks/useNavigation';

import { useUserProfile } from '../account/hooks/useUserProfile';
import NotSubscription from './components/NotSubscription/NotSubscription';
import Pay from './components/Pay';
import PlanCard from './components/PlanCard';
import { useCancel } from './hooks/useCancel';

const Subscription = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, refetch } = useUserProfile();
  const { cancel, isLoading } = useCancel();
  const { navigateTo } = useNavigation();

  const isSubscribed = user?.isSubscribed === true;
  const isCancelled = user?.isSubscriptionCancelled === true;
  const expiredAt = user?.subscriptionExpiredAt ?? null;

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await cancel();
      alert('구독이 해지되었습니다.');
      await refetch();
      setIsOpen(false);
    } catch {
      alert('구독 해지에 실패했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <>
      <PrevNavbar title="구독" back />

      <div className="white-pageContainer pr-[1.462rem]">
        <div className="flex flex-col gap-[3.6rem]">
          {isSubscribed ? (
            <>
              <PlanCard expiredAt={expiredAt} isCancelled={isCancelled} />
              <Pay />

              {isSubscribed && !isCancelled && (
                <button
                  onClick={handleOpenModal}
                  disabled={isLoading}
                  className={clsx(
                    'w-full py-[1.4rem] rounded-[1rem] font-semibold text-[1.6rem] mt-[17rem]',
                    'bg-gray-50 text-gray-300',
                    {
                      'opacity-50 cursor-not-allowed': isLoading,
                    },
                  )}
                >
                  구독 해지하기
                </button>
              )}

              {!isSubscribed && (
                <button
                  onClick={() => {
                    navigateTo('/profile/payments');
                  }}
                  className={clsx(
                    'w-full py-[1.4rem] rounded-[1rem] font-semibold text-[1.6rem] mt-[17rem]',
                    'bg-purple-700 text-white',
                  )}
                >
                  다시 구독하기
                </button>
              )}
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
