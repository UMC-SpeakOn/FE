import type { ChatMessage } from "../types/chat.type";
import type { FinishStep } from "../types/finish.type";
import ChatInput from "./ChatSection/ChatInput";
import MessageList from "./ChatSection/MessageList";
import NotificationOverlay from "./NotificationOverlay";
import InterviewTimer from "./VideoSection/InterviewTimer";

interface ChatModeContentProps {
  messages: ChatMessage[];
  isLoading: boolean;
  isAIResponding?: boolean; // AI 응답 대기 중 상태
  onPlayAudio: (message: ChatMessage) => void;
  formattedTime: string;
  onSendMessage: (message: string) => void;
  finishStep: FinishStep;
  transcript?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  clearTranscript?: () => void;
  interviewer?: {
    name: string;
    nationality: string;
    imgUrl: string;
  };
}

/**
 * ChatModeContent - 채팅 모드 컨텐츠
 *
 * @description
 * 채팅 모드에서 표시되는 메시지 리스트, 입력창, 타이머를 포함합니다.
 */
const ChatModeContent = ({
  messages,
  isLoading,
  isAIResponding,
  onPlayAudio,
  formattedTime,
  onSendMessage,
  finishStep,
  inputValue,
  onInputChange,
  clearTranscript,
  interviewer,
}: ChatModeContentProps) => {
  // 전송 후 transcript 초기화를 포함한 wrapper
  const handleSend = (message: string) => {
    onSendMessage(message);
    clearTranscript?.();
  };

  // AI 응답 대기 중일 때 로딩 메시지 추가
  const loadingMessage: ChatMessage = {
    id: 'loading',
    type: 'AI',
    content: '응답 중...',
    timestamp: new Date(),
  };

  const displayMessages = isAIResponding
    ? [...messages, loadingMessage]
    : messages;

  return (
    <div className="relative h-[65vh] bg-white rounded-2xl overflow-hidden flex flex-col">

      <MessageList messages={displayMessages} onPlayAudio={onPlayAudio} interviewer={interviewer} />
      <ChatInput
        onSend={handleSend}
        disabled={isLoading || isAIResponding}
        value={inputValue}
        onChange={onInputChange}
      />

      {/* 타이머 */}
      <InterviewTimer
        formattedTime={formattedTime}
        variant="chat"
      />

      {/* 🐛 디버깅: 음성 인식 transcript 실시간 표시 */}
      {/* {transcript && (
        <div className="absolute bottom-20 left-4 right-4 bg-yellow-200 border-2 border-yellow-600 rounded-lg p-3 z-40">
          <p className="text-xs text-yellow-800 font-bold mb-1">🎤 음성 인식 중...</p>
          <p className="text-sm text-gray-900">{transcript}</p>
        </div>
      )} */}

      {/* Step 1: 알림 오버레이 (부분 화면) */}
      {finishStep === "notification" && <NotificationOverlay />}

      {/* Step 3: 로딩 오버레이 (전체 화면) */}
      <div
        className={`
          absolute inset-0 bg-black/70 flex items-center justify-center z-40 px-6
          transition-opacity duration-300 ease-in-out
          ${finishStep === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <p className="text-white text-2xl font-bold text-center">
          결과를 불러오는 중...
        </p>
      </div>
    </div>
  );
};

export default ChatModeContent;
