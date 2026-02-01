/**
 * MySpeak API 요청/응답 타입
 */

// 세션 시작
export interface StartSessionRequest {
  myRoleId: number; // My Role ID
  targetQuestionCount: number; // 목표 질문 수
  startedAt: string; // ISO 8601 format (LocalDateTime)
}

export interface StartSessionResponse {
  sessionId: number; // Long 타입 (숫자)
}

// TTS 생성
export interface GenerateTTSRequest {
  text: string;
  interviewId: string;
  messageType: "FOLLOW" | "MAIN" | "FOLLOWCLOSING";
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

// 세션 완료
export interface CompleteSessionRequest {
  endedAt: string; // ISO 8601 format (LocalDateTime)
  totalTime: number; // 초 단위
}

export interface CompleteSessionResponse {
  resultId: number; // Long 타입 (숫자)
}

// TTS 캐시 조회
export interface TTSCacheItem {
  text: string;
  audioUrl: string;
}

export interface GetTTSCacheResponse {
  cachedAudios: TTSCacheItem[];
}
