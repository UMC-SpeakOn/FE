/**
 * 채팅 메시지 타입 정의
 */

export type MessageType = "AI" | "User";

export type ChatMessage = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  audioUrl?: string; // 선택 사항: 오디오 URL
};

export type ChatSession = {
  sessionId: string;
  messages: ChatMessage[];
};
