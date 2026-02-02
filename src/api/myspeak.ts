import type { ApiResponse } from "@/types/api/common.type";
import type {
  CompleteSessionRequest,
  CompleteSessionResponse,
  ConversationTurnRequest,
  ConversationTurnResponse,
  GenerateTTSRequest,
  GenerateTTSResponse,
  GetTTSCacheResponse,
  StartSessionRequest,
  StartSessionResponse,
  UploadSTTRequest,
  UploadSTTResponse,
} from "@/types/api/myspeak.type";
import apiClient, { type CustomAxiosRequestConfig } from "@/utils/apiClient";

/**
 * 세션 시작 API
 */
export const startSession = async (
  data: StartSessionRequest
): Promise<StartSessionResponse> => {
  const response = await apiClient.post<ApiResponse<StartSessionResponse>>(
    "/myspeak/sessions",
    data,
    { authRequired: false } as CustomAxiosRequestConfig
  );
  return response.data.data;
};

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
