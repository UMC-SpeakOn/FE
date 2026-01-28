/**
 * MySpeak API 요청/응답 타입
 */

// 세션 시작
export interface StartSessionRequest {
  schedule: string; // ISO 8601 format
  totalTime: number; // 초 단위
}

export interface StartSessionResponse {
  sessionId: string;
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
  endGoal: string; // ISO 8601 format
  totalTime: number; // 초 단위
}

export interface CompleteSessionResponse {
  resultId: string;
}

// TTS 캐시 조회
export interface TTSCacheItem {
  text: string;
  audioUrl: string;
}

export interface GetTTSCacheResponse {
  cachedAudios: TTSCacheItem[];
}
