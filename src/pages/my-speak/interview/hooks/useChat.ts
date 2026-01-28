import { useCallback, useState } from "react";

import { sendChatMessage as sendChatMessageAPI } from "@/api/ai";

import type { ChatMessage } from "../types/chat.type";

/**
 * useChat - 채팅 기능 커스텀 훅 (API 연동)
 *
 * @description
 * 메시지 목록 관리, 메시지 전송, AI 응답 생성을 담당합니다.
 * 실제 백엔드 API와 통신하여 AI 응답을 받아옵니다.
 *
 * @param initialMessage - 초기 메시지 (AI 오프너 등)
 *
 * @example
 * const { messages, sendMessage, isLoading } = useChat({
 *   id: "opener",
 *   type: "AI",
 *   content: "안녕하세요! 간단한 자기소개 부탁드립니다.",
 *   timestamp: new Date(),
 * });
 */
export const useChat = (initialMessage?: ChatMessage) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessage ? [initialMessage] : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 메시지 전송 및 AI 응답 생성 (API 연동)
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // 유저 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "User",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // AI 응답 요청 (API 호출)
      const response = await sendChatMessageAPI({
        schedule: new Date().toISOString(),
        conversationMessage: content.trim(),
        content: 0, // TODO: 백엔드 팀과 content 필드 용도 확인 필요
      });

      // AI 응답 메시지 추가
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "AI",
        content: response.message,
        timestamp: new Date(),
        audioUrl: response.audioUrl, // TTS 오디오 URL (있으면)
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("[useChat] Failed to send message:", err);
      setError("AI 응답을 받아오는데 실패했습니다. 다시 시도해주세요.");

      // 에러 메시지를 사용자에게 표시 (선택사항)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "AI",
        content:
          "죄송합니다. 일시적인 오류가 발생했습니다. 다시 말씀해 주시겠어요?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 마무리 메시지 추가 (외부에서 호출)
   */
  const addFinishMessage = useCallback(() => {
    const finishMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "AI",
      content:
        "수고하셨습니다! 면접이 종료되었습니다.\n곧 결과 화면으로 이동합니다.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, finishMessage]);
  }, []);

  /**
   * 메시지 직접 추가 (AI 오프너 등)
   */
  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    addFinishMessage,
    addMessage,
  };
};
