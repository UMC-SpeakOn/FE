import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SuccessModal from '@/components/Modal/SuccessModal';
import PrevNavbar from '@/components/Navbar/PrevNavbar';

import Pay from './components/Pay';
import PlanCard from './components/PlanCard';
import { useConfirm } from './hooks/useConfirm';

const Payments = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const calledRef = useRef(false);

  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amountParam = params.get('amount');
  const amount = amountParam ? Number(amountParam) : null;

  const isSuccess = Boolean(paymentKey && orderId && amount);
  const { confirm, isLoading } = useConfirm();

  useEffect(() => {
    if (!isSuccess) return;
    if (calledRef.current) return;

    calledRef.current = true;
    confirm({
      paymentKey: paymentKey as string,
      orderId: orderId as string,
      amount: amount as number,
    });
  }, [isSuccess, confirm, paymentKey, orderId, amount]);

  return (
    <>
      <PrevNavbar title="구독" back />

      <div className="white-pageContainer pr-[1.462rem]">
        <PlanCard />
        <Pay />
      </div>

      {isSuccess && !isLoading && (
        <SuccessModal
          open
          title="결제 완료"
          descriptions={[
            '이제부터 내가 말한 대화 기록을 저장하고',
            '언제든지 다시 확인할 수 있어요',
          ]}
          onClose={() => navigate('/profile/account', { replace: true })}
        />
      )}

      {isLoading && (
        <div className="fixed inset-y-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center bg-black/70 max-w-[430px] w-full">
          <SuccessModal
            open
            title="결제 승인 중"
            descriptions={[
              '결제 정보를 확인하고 있어요.',
              '잠시만 기다려 주세요.',
            ]}
            variant="loading"
            closable={false}
          />
        </div>
      )}
    </>
  );
};

export default Payments;
