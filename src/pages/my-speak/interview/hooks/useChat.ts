import { useCallback, useState } from "react";

import type { ChatMessage } from "../types/chat.type";

// Mock AI 응답 목록
const mockAIResponses = [
  "좋은 답변이었습니다. 다음 질문으로, 본인의 강점을 하나 말씀해 주세요.",
  "알겠습니다. 그럼 왜 저희 회사에 지원하셨나요?",
  "흥미로운 경험이네요. 팀에서 갈등이 생겼을 때 어떻게 해결하셨나요?",
  "잘 이해했습니다. 5년 후 본인의 모습을 어떻게 그리고 계신가요?",
  "좋습니다. 마지막으로 저희에게 궁금한 점이 있으신가요?",
];

/**
 * useChat - 채팅 기능 커스텀 훅
 *
 * @description
 * 메시지 목록 관리, 메시지 전송, Mock AI 응답 생성을 담당합니다.
 * 실제 API 연동 시 이 훅에서 API 호출로 교체하면 됩니다.
 */
export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "AI",
      content:
        "안녕하세요! 면접을 시작하겠습니다. 간단한 자기소개 부탁드립니다.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 메시지 전송 및 Mock AI 응답 생성
   */
  const sendMessage = useCallback((content: string) => {
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

    // Mock AI 응답 (1초 딜레이)
    setTimeout(() => {
      const randomResponse =
        mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "AI",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
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

  return {
    messages,
    isLoading,
    sendMessage,
    addFinishMessage,
  };
};
