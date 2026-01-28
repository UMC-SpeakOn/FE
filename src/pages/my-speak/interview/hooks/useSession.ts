import { useCallback, useState } from "react";

import { useMutation } from "@/hooks/useApi";
import type {
  CompleteSessionRequest,
  CompleteSessionResponse,
  StartSessionRequest,
  StartSessionResponse,
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
  const [sessionId, setSessionId] = useState<string | null>(null);

  // 세션 시작 mutation
  const {
    mutate: startSessionMutation,
    isLoading: isStarting,
    error: startError,
  } = useMutation<StartSessionResponse, StartSessionRequest>(
    (data) => ({
      method: "POST",
      url: "/api/myspeak/sessions",
      data,
    }),
    {
      onSuccess: (data) => {
        if (data) {
          setSessionId(data.sessionId);
        }
      },
    }
  );

  // 세션 완료 mutation
  const {
    mutate: completeSessionMutation,
    isLoading: isCompleting,
    error: completeError,
  } = useMutation<CompleteSessionResponse, CompleteSessionRequest>(
    (data) => ({
      method: "POST",
      url: `/api/myspeak/${sessionId}/complete`,
      data,
    })
  );

  /**
   * 세션 시작
   * @param totalTime - 예상 면접 시간 (초 단위, 보통 0으로 시작)
   */
  const start = useCallback(
    async (totalTime: number = 0) => {
      const schedule = new Date().toISOString();
      return await startSessionMutation({ schedule, totalTime });
    },
    [startSessionMutation]
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
      const endGoal = new Date().toISOString();
      return await completeSessionMutation({ endGoal, totalTime });
    },
    [sessionId, completeSessionMutation]
  );

  return {
    sessionId,
    isStarting,
    isCompleting,
    startError,
    completeError,
    start,
    complete,
  };
};
