import type { GoalItem } from '@/pages/my-speak/setting/types/setting.type';

/**
 * MySpeak API 요청/응답 타입
 */

// 대화 세션 생성 요청
export interface CreateSessionRequest {
  myRoleId: number;
  targetQuestionCount: GoalItem['targetQuestionCount'];
  startedAt: string;
}

// 대화 세션 생성 응답
export type CreateSessionResult = number;

// TTS 생성
export interface GenerateTTSRequest {
  text: string;
  interviewId: string;
  messageType: 'FOLLOW' | 'MAIN' | 'FOLLOWCLOSING';
  voiceName: string;
  threadingFile?: string;
}

export interface GenerateTTSResponse {
  audioUrl: string;
  duration?: number;
}

// STT 업로드
export interface UploadSTTRequest {
  file: File;
  meta: {
    sessionId: string;
    timestamp: string;
  };
}

export interface UploadSTTResponse {
  transcript: string;
  confidence?: number;
}

// 대화 턴
export interface ConversationTurnRequest {
  languageCode?: string; // 기본값: "en-US"
  messageType: 'MAIN' | 'FOLLOW' | 'CLOSING';
}

export interface ConversationTurnResponse {
  answerText?: string; // 사용자 답변 텍스트 (음성 파일 전송 시에만 포함)
  questionText: string; // AI 질문 텍스트
  base64Audio: string; // base64 인코딩된 mp3
  messageType: 'MAIN' | 'FOLLOW' | 'CLOSING';
}

// 세션 완료
export interface CompleteSessionRequest {
  endedAt: string; // ISO 8601 format (LocalDateTime) - 실제 백엔드 스펙
  totalTime: number; // 초 단위
}

export interface CompleteSessionResponse {
  sessionId: number; // Long 타입
  totalTime: number; // 초 단위
  sentenceCount: number; // 문장 수
  closingTtsBase64: string; // 마무리 TTS
  closingText?: string; // 마무리 텍스트 (선택적)
}

// 오프너 조회 (세션 기반)
export interface GetSessionOpenerResponse {
  questionText: string; // 오프닝 질문 텍스트
  base64Audio: string; // base64 인코딩된 오디오
  messageType: 'OPENING'; // 메시지 타입
}

// TTS 캐시 조회
export interface TTSCacheItem {
  text: string;
  audioUrl: string;
}

export interface GetTTSCacheResponse {
  cachedAudios: TTSCacheItem[];
}
