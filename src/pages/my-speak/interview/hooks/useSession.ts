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
      const endedAt = new Date().toISOString();
      return await completeSessionMutation({ endedAt, totalTime });
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
