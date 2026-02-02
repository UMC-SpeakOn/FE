import type { ApiResponse } from "@/types/api/common.type";
import type {
  CompleteSessionRequest,
  CompleteSessionResponse,
  ConversationTurnRequest,
  ConversationTurnResponse,
  GenerateTTSRequest,
  GenerateTTSResponse,
  GetTTSCacheResponse,
  UploadSTTRequest,
  UploadSTTResponse,
} from "@/types/api/myspeak.type";
import apiClient, { type CustomAxiosRequestConfig } from "@/utils/apiClient";


/**
 * TTS 생성 API
 */
export const generateTTS = async (
  data: GenerateTTSRequest
): Promise<GenerateTTSResponse> => {
  const response = await apiClient.post<ApiResponse<GenerateTTSResponse>>(
    "/myspeak/tts",
    data,
    { authRequired: false } as CustomAxiosRequestConfig
  );
  return response.data.data;
};

/**
 * STT 업로드 API
 */
export const uploadSTT = async (
  data: UploadSTTRequest
): Promise<UploadSTTResponse> => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("meta", JSON.stringify(data.meta));

  const response = await apiClient.post<ApiResponse<UploadSTTResponse>>(
    "/myspeak/stt",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      authRequired: false,
    } as CustomAxiosRequestConfig
  );
  return response.data.data;
};

/**
 * 대화 턴 전송 API
 */
export const sendConversationTurn = async (
  sessionId: number,
  audioFile: File,
  metadata: ConversationTurnRequest
): Promise<ConversationTurnResponse> => {
  const formData = new FormData();
  formData.append("file", audioFile);
  formData.append("languageCode", metadata.languageCode || "en-US");
  formData.append("messageType", metadata.messageType);

  const response = await apiClient.post<ApiResponse<ConversationTurnResponse>>(
    `/myspeak/sessions/${sessionId}/turns`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      authRequired: false,
    } as CustomAxiosRequestConfig
  );

  return response.data.data;
};

/**
 * 대화 턴 전송 API (텍스트 전용)
 */
export const sendConversationTurnText = async (
  sessionId: number,
  answerText: string,
  messageType: "MAIN" | "FOLLOW" | "CLOSING" = "MAIN",
  languageCode: string = "en-US"
): Promise<ConversationTurnResponse> => {
  const response = await apiClient.post<{
    isSuccess: boolean;
    code: string;
    message: string;
    result: {
      questionText: string;
      base64Audio: string;
      messageType: "MAIN" | "FOLLOW" | "CLOSING";
    };
  }>(
    `/myspeak/sessions/${sessionId}/turns/text`,
    {
      languageCode,
      answerText,
      messageType,
    },
    { authRequired: true } as CustomAxiosRequestConfig
  );

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
  data: CompleteSessionRequest
): Promise<CompleteSessionResponse> => {
  const response = await apiClient.post<ApiResponse<CompleteSessionResponse>>(
    `/myspeak/sessions/${sessionId}/complete`,
    data,
    { authRequired: false } as CustomAxiosRequestConfig
  );
  return response.data.data;
};

/**
 * TTS 캐시 조회 API
 */
export const getTTSCache = async (
  userId: number
): Promise<GetTTSCacheResponse> => {
  const response = await apiClient.get<ApiResponse<GetTTSCacheResponse>>(
    "/myspeak/ttsCache",
    {
      params: { userId },
      authRequired: false,
    } as CustomAxiosRequestConfig
  );
  return response.data.data;
};
