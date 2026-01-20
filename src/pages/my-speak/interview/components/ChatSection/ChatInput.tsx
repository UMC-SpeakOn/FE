import { useState } from "react";

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
    <div className="flex items-end gap-2 px-4 py-3 bg-white border-t border-gray-200">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        disabled={disabled}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-purple-500 max-h-24"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
      >
        전송
      </button>
    </div>
  );
};

export default ChatInput;
