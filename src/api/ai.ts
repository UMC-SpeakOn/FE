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
  try {
    // 백엔드 실제 응답 구조: { isSuccess, code, message, result }
    const response = await apiClient.get<{
      isSuccess: boolean;
      code: string;
      message: string;
      result: string;
    }>(
      "/ai/opener",
      {
        params: { myRoleId },
        authRequired: false,
      } as CustomAxiosRequestConfig
    );

    // 응답 구조 확인
    if (!response.data?.result) {
      throw new Error('AI 오프너 응답 형식이 올바르지 않습니다.');
    }

    // Swagger 응답(result)을 기존 구조로 매핑 (Phase 4에서 리팩토링 예정)
    return {
      result: response.data.result,
      content: response.data.result, // 임시 호환성
      audioUrl: undefined, // AI Opener는 오디오 없음
    };
  } catch (error) {
    throw error;
  }
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
