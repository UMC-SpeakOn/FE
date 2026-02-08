import type { TossPaymentParams } from '@/types/api/payments.type';

export const useTossPayment = () => {
  const requestPayment = async (params: TossPaymentParams) => {
    const tossPayments = window.TossPayments(
      import.meta.env.VITE_TOSS_CLIENT_KEY,
    );

    await tossPayments.requestPayment('카드', params);
  };

  return { requestPayment };
};
