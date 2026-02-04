import type {
  PaymentsItem,
  SubscribeItem,
} from '@/pages/profile/account/types/account.type';

export const subscribeData: SubscribeItem = {
  isSubscribed: true,
};

export const paymentsData: PaymentsItem = {
  name: 'Conversation Record plan',
  explain: '시뮬레이션 대화 기록 무제한 저장',
  price: 3900,
  nextPaymentDate: '2026.02.20',
  paymentMethod: '토스페이',
};
