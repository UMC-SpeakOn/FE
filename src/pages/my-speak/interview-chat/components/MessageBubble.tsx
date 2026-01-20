import type { ChatMessage } from "../types/chat.type";

interface MessageBubbleProps {
  message: ChatMessage;
  onPlayAudio?: () => void;
}

/**
 * MessageBubble - 개별 채팅 메시지 말풍선
 *
 * @description
 * AI/User 메시지를 구분하여 스타일링된 말풍선으로 표시합니다.
 * - AI: 왼쪽 정렬, 보라색 배경
 * - User: 오른쪽 정렬, 회색 배경
 *
 * @features
 * - 메시지 타입별 차별화된 스타일
 * - 타임스탬프 표시
 * - 오디오 재생 버튼 (선택 사항)
 */
const MessageBubble = ({ message, onPlayAudio }: MessageBubbleProps) => {
  const isAI = message.type === "AI";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl ${isAI
            ? "bg-purple-600 text-white rounded-tl-none"
            : "bg-gray-200 text-gray-900 rounded-tr-none"
          }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* 타임스탬프 */}
        <p
          className={`text-xs mt-1 ${isAI ? "text-purple-100" : "text-gray-500"
            }`}
        >
          {message.timestamp.toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {/* 오디오 아이콘 (선택 사항) */}
        {message.audioUrl && (
          <button onClick={onPlayAudio} className="mt-2 text-xs underline">
            🔊 소리 듣기
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
