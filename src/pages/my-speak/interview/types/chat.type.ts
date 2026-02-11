/**
 * 채팅 메시지 타입 정의
 */

export type MessageType = "AI" | "User";

export type ApiMessageType = "OPENING" | "MAIN" | "FOLLOW" | "CLOSING";

export type ChatMessage = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  audioUrl?: string; // 선택 사항: 오디오 URL
  messageType?: ApiMessageType; // API 메시지 타입 (AI 메시지에만 해당)
};

export type ChatSession = {
  sessionId: string;
  messages: ChatMessage[];
};
