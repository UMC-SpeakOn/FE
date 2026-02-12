import type { ApiResponse } from '@/types/api/common.type';
import type {
  CompleteSessionRequest,
  CompleteSessionResponse,
  ConversationTurnRequest,
  ConversationTurnResponse,
  GenerateTTSRequest,
  GenerateTTSResponse,
  GetSessionOpenerResponse,
  GetTTSCacheResponse,
  UploadSTTRequest,
  UploadSTTResponse,
} from '@/types/api/myspeak.type';
import type { ServerApiResponse } from '@/types/api/server.type';
import apiClient, { type CustomAxiosRequestConfig } from '@/utils/apiClient';

/**
 * 세션 오프너(첫 질문) 조회 API
 * Swagger 명세: GET /api/myspeak/sessions/{sessionId}/opener
 */
export const getSessionOpener = async (
  sessionId: number,
): Promise<GetSessionOpenerResponse> => {
  const response = await apiClient.get<
    ServerApiResponse<{
      questionText: string;
      base64Audio: string;
      messageType: 'OPENING';
    }>
  >(`/myspeak/sessions/${sessionId}/opener`, {
    authRequired: true,
  } as CustomAxiosRequestConfig);

  // 백엔드 응답 구조 매핑
  return {
    questionText: response.data.result.questionText,
    base64Audio: response.data.result.base64Audio,
    messageType: response.data.result.messageType,
  };
};

/**
 * TTS 생성 API
 */
export const generateTTS = async (
  data: GenerateTTSRequest,
): Promise<GenerateTTSResponse> => {
  const response = await apiClient.post<ApiResponse<GenerateTTSResponse>>(
    '/myspeak/tts',
    data,
    { authRequired: false } as CustomAxiosRequestConfig,
  );
  return response.data.data;
};

/**
 * STT 업로드 API
 */
export const uploadSTT = async (
  data: UploadSTTRequest,
): Promise<UploadSTTResponse> => {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('meta', JSON.stringify(data.meta));

  const response = await apiClient.post<ApiResponse<UploadSTTResponse>>(
    '/myspeak/stt',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      authRequired: false,
    } as CustomAxiosRequestConfig,
  );
  return response.data.data;
};

/**
 * 대화 턴 전송 API (음성 파일)
 */
export const sendConversationTurn = async (
  sessionId: number,
  audioFile: File,
  metadata: ConversationTurnRequest,
): Promise<ConversationTurnResponse> => {
  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('languageCode', metadata.languageCode || 'en-US');
  formData.append('messageType', metadata.messageType);

  const response = await apiClient.post<
    ServerApiResponse<{
      answerText: string;
      questionText: string;
      base64Audio: string;
      messageType: 'MAIN' | 'FOLLOW' | 'CLOSING';
    }>
  >(`/myspeak/sessions/${sessionId}/turns`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    authRequired: true,
  } as CustomAxiosRequestConfig);

  // 백엔드 응답 구조 { result: { answerText, questionText, base64Audio, messageType } }를 매핑
  return {
    answerText: response.data.result.answerText,
    questionText: response.data.result.questionText,
    base64Audio: response.data.result.base64Audio,
    messageType: response.data.result.messageType,
  };
};

/**
 * 대화 턴 전송 API (텍스트 전용)
 * 실제 백엔드: Request Body { answerText, languageCode, messageType }
 */
export const sendConversationTurnText = async (
  sessionId: number,
  answerText: string,
  messageType: 'MAIN' | 'FOLLOW' | 'CLOSING' = 'MAIN',
  languageCode: string = 'en-US',
): Promise<ConversationTurnResponse> => {
  const requestBody = {
    answerText, // 실제 백엔드: "answerText" 필드 사용 (Swagger 문서와 다름)
    languageCode,
    messageType,
  };

  const response = await apiClient.post<
    ServerApiResponse<{
      questionText: string;
      base64Audio: string;
      messageType: 'MAIN' | 'FOLLOW' | 'CLOSING';
    }>
  >(`/myspeak/sessions/${sessionId}/turns/text`, requestBody, {
    authRequired: true,
  } as CustomAxiosRequestConfig);

  // 백엔드 응답 구조 { result: { questionText, base64Audio, messageType } }를 매핑
  return {
    questionText: response.data.result.questionText,
    base64Audio: response.data.result.base64Audio,
    messageType: response.data.result.messageType,
  };
};

/**
 * 세션 완료 API
 */
export const completeSession = async (
  sessionId: number,
  data: CompleteSessionRequest,
): Promise<CompleteSessionResponse> => {
  const response = await apiClient.post<ApiResponse<CompleteSessionResponse>>(
    `/myspeak/sessions/${sessionId}/complete`,
    data,
    { authRequired: false } as CustomAxiosRequestConfig,
  );
  return response.data.data;
};

/**
 * TTS 캐시 조회 API
 */
export const getTTSCache = async (
  userId: number,
): Promise<GetTTSCacheResponse> => {
  const response = await apiClient.get<ApiResponse<GetTTSCacheResponse>>(
    '/myspeak/ttsCache',
    {
      params: { userId },
      authRequired: false,
    } as CustomAxiosRequestConfig,
  );
  return response.data.data;
};
/**
 * 리포트 삭제 API
 * DELETE /api/reports/{reportId}
 */
export const deleteReport = async (reportId: number) => {
  const response = await apiClient.delete<
    ServerApiResponse<{
      reportId: number;
      deletedAt: string;
    }>
  >(`/reports/${reportId}`, { authRequired: true } as CustomAxiosRequestConfig);

  return response.data.result;
};
