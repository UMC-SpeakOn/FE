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
  const response = await apiClient.get<
    ApiResponse<{ result: string }>
  >(
    "/ai/opener",
    {
      params: { myRoleId },
      authRequired: false,
    } as CustomAxiosRequestConfig
  );

  // Swagger 응답(result)을 기존 구조로 매핑 (Phase 4에서 리팩토링 예정)
  return {
    result: response.data.data.result,
    content: response.data.data.result, // 임시 호환성
    audioUrl: undefined, // AI Opener는 오디오 없음
  };
};

/**
 * AI 채팅 API
 */
export const sendChatMessage = async (
  data: SendChatMessageRequest
): Promise<SendChatMessageResponse> => {
  const response = await apiClient.post<ApiResponse<SendChatMessageResponse>>(
    "/ai/chat",
    data,
    { authRequired: false } as CustomAxiosRequestConfig
  );
  return response.data.data;
};
