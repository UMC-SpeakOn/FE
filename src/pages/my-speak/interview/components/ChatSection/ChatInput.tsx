import { useEffect, useRef, useState } from 'react';

import sandMessageIcon from '@/assets/images/icons/sand-message.svg';
import { useKeyboardHeight } from '@/hooks/useKeyboardHeight';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
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
 * - Controlled/Uncontrolled 모드 지원
 * - 동적 높이 조정 (내용에 따라 자동으로 늘어남)
 */
const ChatInput = ({
  onSend,
  disabled,
  value: externalValue,
  onChange: externalOnChange,
}: ChatInputProps) => {
  const [internalMessage, setInternalMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { keyboardHeight, isKeyboardVisible } = useKeyboardHeight();

  // Controlled mode: 외부에서 value와 onChange 제공
  // Uncontrolled mode: 내부 상태 사용
  const isControlled = externalValue !== undefined;
  const message = isControlled ? externalValue : internalMessage;
  const setMessage = isControlled ? externalOnChange! : setInternalMessage;

  // 텍스트 변경 시 textarea 높이 자동 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
      // 전송 후 높이 초기화
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`flex items-end gap-3 px-4 bg-white transition-all duration-300 ease-in-out ${isKeyboardVisible
        ? 'fixed left-0 bottom-0 w-full border-t border-gray-300 py-4 z-50'
        : 'py-3'
        }`}
      style={{
        transform: isKeyboardVisible
          ? `translateY(-${keyboardHeight}px)`
          : undefined,
      }}
    >
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="입력하세요"
        disabled={disabled}
        className="flex-1 px-8 py-4 bg-gray-100 rounded-3xl resize-none focus:outline-none focus:bg-gray-200 max-h-40 text-2xl text-gray-900 overflow-y-auto scroll"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className="flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="전송"
      >
        <img src={sandMessageIcon} alt="전송" />
      </button>
    </div>
  );
};

export default ChatInput;
