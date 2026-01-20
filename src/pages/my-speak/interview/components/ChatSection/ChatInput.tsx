import { useState } from "react";

import sandMessageIcon from "@/assets/images/icons/sand-message.svg";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

/**
 * ChatInput - 채팅 입력 영역
 *
 * @description
 * 텍스트 입력 및 전송 버튼을 포함합니다.
 * Enter 키로 전송, Shift+Enter로 줄바꿈 지원
 *
 * @features
 * - 텍스트 입력 필드
 * - 전송 버튼
 * - 키보드 단축키 (Enter: 전송, Shift+Enter: 줄바꿈)
 * - 빈 메시지 전송 방지
 */
const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-3 px-4 py-3 bg-white">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        disabled={disabled}
        className="flex-1 px-4 py-3 bg-gray-100 rounded-2xl resize-none focus:outline-none focus:bg-gray-200 max-h-24 text-gray-900"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="전송"
      >
        <img src={sandMessageIcon} alt="전송" className="w-10 h-10" />
      </button>
    </div>
  );
};

export default ChatInput;
