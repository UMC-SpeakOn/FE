import type {
  PaymentsItem,
  SubscribeItem,
} from '@/pages/profile/account/types/account.type';

export const subscribeData: SubscribeItem = {
  isSubscribed: true,
};

export const paymentsData: PaymentsItem = {
  name: 'Conversation Record plan',
  price: 3900,
  nextPaymentDate: '2026.02.20',
  paymentMethod: '토스페이',
};
