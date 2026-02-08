import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SuccessModal from '@/components/Modal/SuccessModal';

import { useConfirm } from './hooks/useConfirm';

const PaymentsSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const calledRef = useRef(false);

  const paymentKey = params.get('paymentKey');
  const orderId = params.get('orderId');
  const amountParam = params.get('amount');
  const amount = amountParam ? Number(amountParam) : null;

  const { confirm, isLoading } = useConfirm();

  useEffect(() => {
    if (calledRef.current) return;
    if (!paymentKey || !orderId || !amount) return;

    calledRef.current = true;
    confirm({ paymentKey, orderId, amount });
  }, [paymentKey, orderId, amount, confirm]);

  if (isLoading) {
    return <div className="white-pageContainer">결제 승인 중...</div>;
  }

  return (
    <SuccessModal
      open
      title="결제 완료"
      descriptions={[
        '이제부터 내가 말한 대화 기록을 저장하고',
        '언제든지 다시 확인할 수 있어요',
      ]}
      onClose={() => navigate('/profile/account', { replace: true })}
    />
  );
};

export default PaymentsSuccess;
