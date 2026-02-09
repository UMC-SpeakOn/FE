import { useCallback, useState } from "react";

import { useMutation } from "@/hooks/useApi";
import type {
  CompleteSessionRequest,
  CompleteSessionResponse,
} from "@/types/api/myspeak.type";

/**
 * useSession - 면접 세션 관리 훅
 *
 * @description
 * 세션 시작, 완료, 세션 ID 관리를 담당합니다.
 *
 * @example
 * const { sessionId, start, complete, isStarting } = useSession();
 *
 * // 세션 시작
 * await start(0);
 *
 * // 세션 완료 (totalTime은 초 단위)
 * await complete(900); // 15분 = 900초
 */
export const useSession = () => {
  const [sessionId, setSessionId] = useState<number | null>(null);


  // 세션 완료 mutation
  const {
    mutate: completeSessionMutation,
    isLoading: isCompleting,
    error: completeError,
  } = useMutation<CompleteSessionResponse, CompleteSessionRequest>(
    (data) => ({
      method: "POST",
      url: `/myspeak/sessions/${sessionId}/complete`,
      data,
    })
  );


  /**
   * 세션 완료
   * @param totalTime - 실제 면접 진행 시간 (초 단위)
   */
  const complete = useCallback(
    async (totalTime: number) => {
      if (!sessionId) {
        throw new Error("Session ID is not available");
      }
      const endedAt = new Date().toISOString(); // 실제 백엔드: endedAt 필드 사용

      // 디버깅: 실제 요청 데이터 로그
      console.log('[useSession.complete] Request:', {
        url: `/myspeak/sessions/${sessionId}/complete`,
        body: { endedAt, totalTime },
      });

      const response = await completeSessionMutation({ endedAt, totalTime });

      // API 응답이 래핑되어 있는 경우 언래핑
      if (response && typeof response === 'object' && 'result' in response) {
        console.log('[useSession.complete] Unwrapping response.result');
        return (response as any).result as CompleteSessionResponse;
      }

      return response;
    },
    [sessionId, completeSessionMutation]
  );

  return {
    sessionId,
    setSessionId,
    isCompleting,
    completeError,
    complete,
  };
};
