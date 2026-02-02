import { useMutation } from "@/hooks/useApi";
import type {
  ConversationTurnRequest,
  ConversationTurnResponse,
} from "@/types/api/myspeak.type";

/**
 * useConversationTurn - 대화 턴 관리 훅
 *
 * @description
 * 음성 파일을 서버에 전송하고 AI 응답을 받아옵니다.
 *
 * @example
 * const { sendTurn, isPending, error } = useConversationTurn(sessionId);
 *
 * // 대화 턴 전송
 * const response = await sendTurn(audioFile, 'MAIN');
 */
export const useConversationTurn = (sessionId: number | null) => {
  const { mutate, isLoading: isPending, error } = useMutation<
    ConversationTurnResponse,
    FormData
  >(
    (formData) => ({
      method: "POST",
      url: `/myspeak/sessions/${sessionId}/turns`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
  );

  /**
   * 대화 턴 전송
   * @param audioFile - 녹음된 음성 파일
   * @param messageType - 메시지 타입 ('MAIN' | 'FOLLOW' | 'CLOSING')
   */
  const sendTurn = async (
    audioFile: File,
    messageType: ConversationTurnRequest["messageType"] = "MAIN"
  ) => {
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("languageCode", "en-US");
    formData.append("messageType", messageType);

    return await mutate(formData);
  };
  return { sendTurn, isPending, error };
};
