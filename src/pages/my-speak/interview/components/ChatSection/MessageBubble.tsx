import type { ChatMessage } from '../../types/chat.type';

interface MessageBubbleProps {
  message: ChatMessage;
  onPlayAudio?: () => void;
  interviewer?: {
    name: string;
    nationality: string;
    imgUrl: string;
  };
}

/**
 * MessageBubble - 개별 채팅 메시지 말풍선
 *
 * @description
 * AI/User 메시지를 구분하여 스타일링된 말풍선으로 표시합니다.
 * - AI: 왼쪽 정렬, 보라색 배경, 프로필 이미지
 * - User: 오른쪽 정렬, 회색 배경
 *
 * @features
 * - 메시지 타입별 차별화된 스타일
 * - AI 튜터 프로필 이미지 (AI 메시지만)
 * - 타임스탬프 표시
 * - 오디오 재생 버튼 (선택 사항)
 */
const MessageBubble = ({ message, interviewer }: MessageBubbleProps) => {
  const isAI = message.type === 'AI';
  const isLoading = message.id === 'loading';

  return (
    <div
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-8 px-4 animate-fade-in-up`}
    >
      <div
        className={`flex ${isAI ? 'flex-row' : 'flex-row-reverse'} gap-2 max-w-[80%]`}
      >
        {/* AI 튜터 프로필 이미지 (AI 메시지만) */}
        {isAI && interviewer && (
          <img
            src={interviewer.imgUrl}
            alt={interviewer.name}
            className={`w-12 h-12 rounded-full flex-shrink-0 ${isLoading ? 'opacity-70' : ''}`}
          />
        )}

        <div className={`flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
          {/* 말풍선 */}
          <div
            className={`px-4 py-3 rounded-xl text-gray-900 ${isAI ? 'bg-purple-200 ' : 'bg-gray-100'
              } ${isLoading ? 'opacity-70 animate-pulse' : ''}`}
          >
            <p className="text-xl font-medium leading-relaxed whitespace-pre-wrap break-all">
              {isLoading ? (
                <span className="inline-flex items-center gap-1">
                  응답 중
                  <span className="inline-flex gap-0.5">
                    <span className="inline-block w-1 h-1 bg-gray-900 rounded-full animate-bounce [animation-delay:0ms]"></span>
                    <span className="inline-block w-1 h-1 bg-gray-900 rounded-full animate-bounce [animation-delay:150ms]"></span>
                    <span className="inline-block w-1 h-1 bg-gray-900 rounded-full animate-bounce [animation-delay:300ms]"></span>
                  </span>
                </span>
              ) : (
                message.content
              )}
            </p>
          </div>

          {/* 타임스탬프 */}
          {/* <p className="text-xs mt-1 text-gray-400">
            {message.timestamp.toLocaleTimeString("ko-KR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p> */}

          {/* 오디오 아이콘 (선택 사항) */}
          {/* {message.audioUrl && (
            <button
              onClick={onPlayAudio}
              className="mt-1 text-xs text-purple-500 underline"
            >
              🔊 소리 듣기
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
