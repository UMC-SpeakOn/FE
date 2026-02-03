import { useEffect, useRef } from "react";

import type { ChatMessage } from "../../types/chat.type";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: ChatMessage[];
  onPlayAudio?: (message: ChatMessage) => void;
  interviewer?: {
    name: string;
    nationality: string;
    imgUrl: string;
  };
}

/**
 * MessageList - 채팅 메시지 목록
 *
 * @description
 * 메시지 배열을 렌더링하고 자동 스크롤을 관리합니다.
 *
 * @features
 * - 메시지 목록 렌더링
 * - 새 메시지 추가 시 자동 스크롤
 * - 빈 상태 처리
 */
const MessageList = ({ messages, onPlayAudio, interviewer }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 새 메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-8 scroll">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400 text-center">메시지가 없습니다.</p>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            onPlayAudio={() => onPlayAudio?.(message)}
            interviewer={interviewer}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;
