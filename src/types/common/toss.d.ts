export {};

declare global {
  interface Window {
    TossPayments: (clientKey: string) => TossPaymentsInstance;
  }
}

interface TossPaymentsInstance {
  requestPayment(
    method: '카드',
    params: {
      amount: number;
      orderId: string;
      orderName: string;
      successUrl: string;
      failUrl: string;
    },
  ): Promise<void>;
}
