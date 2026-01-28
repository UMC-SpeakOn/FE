import type { ApiResponse } from "@/types/api/common.type";
import type {
  CompleteSessionRequest,
  CompleteSessionResponse,
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
    "/api/myspeak/sessions",
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
    "/api/myspeak/tts",
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
    "/api/myspeak/stt",
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
 * 세션 완료 API
 */
export const completeSession = async (
  sessionId: string,
  data: CompleteSessionRequest
): Promise<CompleteSessionResponse> => {
  const response = await apiClient.post<ApiResponse<CompleteSessionResponse>>(
    `/api/myspeak/${sessionId}/complete`,
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
    "/api/myspeak/ttsCache",
    {
      params: { userId },
      authRequired: false,
    } as CustomAxiosRequestConfig
  );
  return response.data.data;
};
