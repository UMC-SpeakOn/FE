export type SocialType = 'GOOGLE' | 'KAKAO';

export interface UserItem {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  name: string;
  email: string;
  socialType: SocialType;
}

/* 구독 여부 */
export interface SubscribeItem {
  isSubscribed: boolean;
}

/* 구독 정보 */
export type PaymentMethod = '토스페이';

export interface PaymentsItem {
  name: string;
  price: number;
  nextPaymentDate: string;
  paymentMethod: PaymentMethod;
}
