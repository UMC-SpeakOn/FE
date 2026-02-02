/**
 * AI API 요청/응답 타입
 */

// AI Opener 조회
export interface GetAIOpenerResponse {
  result: string; // 오프닝 멘트 텍스트 (Swagger 명세)
  // 임시 호환성 필드 (Phase 4에서 제거 예정)
  content: string;
  audioUrl?: string;
}

// AI 채팅
export interface SendChatMessageRequest {
  schedule: string;
  conversationMessage: string;
  content: number;
}

export interface SendChatMessageResponse {
  message: string;
  audioUrl?: string;
  messageType?: "FOLLOW" | "MAIN" | "FOLLOWCLOSING";
}
