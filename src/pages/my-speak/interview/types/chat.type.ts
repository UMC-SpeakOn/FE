/**
 * 채팅 메시지 타입
 */
export type MessageType = "AI" | "User";

/**
 * ChatMessage - 채팅 메시지 인터페이스
 *
 * @description
 * AI 면접관과 사용자 간의 채팅 메시지 데이터 구조입니다.
 *
 * @property id - 메시지 고유 식별자
 * @property content - 메시지 내용
 * @property type - 메시지 타입 (AI 또는 User)
 * @property timestamp - 메시지 생성 시간
 * @property audioUrl - 음성 파일 URL (선택 사항)
 */
export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  audioUrl?: string;
}
