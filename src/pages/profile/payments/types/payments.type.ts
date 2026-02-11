/* 구독 정보 */
export type PaymentMethod = '토스페이';

export interface PaymentsItem {
  name: string;
  explain: string;
  price: number;
  paymentMethod: PaymentMethod;
}
