import type {
  GetAIOpenerResponse,
  SendChatMessageRequest,
  SendChatMessageResponse,
} from "@/types/api/ai.type";
import type { ApiResponse } from "@/types/api/common.type";
import apiClient, { type CustomAxiosRequestConfig } from "@/utils/apiClient";

/**
 * AI 오프너(첫 질문) 조회 API
 */
export const getAIOpener = async (
  myRoleId: number
): Promise<GetAIOpenerResponse> => {
  const response = await apiClient.get<ApiResponse<GetAIOpenerResponse>>(
    "/api/ai/opener",
    {
      params: { myRoleId },
      authRequired: false,
    } as CustomAxiosRequestConfig
  );
  return response.data.data;
};

/**
 * AI 채팅 API
 */
export const sendChatMessage = async (
  data: SendChatMessageRequest
): Promise<SendChatMessageResponse> => {
  const response = await apiClient.post<ApiResponse<SendChatMessageResponse>>(
    "/api/ai/chat",
    data,
    { authRequired: false } as CustomAxiosRequestConfig
  );
  return response.data.data;
};
