/**
 * AI API 요청/응답 타입
 */

// AI 오프너 조회
export interface GetAIOpenerRequest {
  myRoleId: number;
}

export interface GetAIOpenerResponse {
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
