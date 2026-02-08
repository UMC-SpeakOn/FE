// 토스 SDK 결제 요청
export interface TossPaymentParams {
  amount: number;
  orderId: string;
  orderName: string;
  successUrl: string;
  failUrl: string;
}

// 결제 승인 API 요청
export interface ConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

// 결제 승인 API 응답
export interface ConfirmResult {
  subscriptionId: number;
  orderName: string;
  amount: number;
  approvedAt: string;
  expiredAt: string;
  orderId: string;
  message: string;
}
