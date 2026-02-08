import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentsFail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alert('결제가 실패했습니다. 다시 시도해주세요.');
    navigate('/profile/payments', { replace: true });
  }, [navigate]);

  return null;
};

export default PaymentsFail;
