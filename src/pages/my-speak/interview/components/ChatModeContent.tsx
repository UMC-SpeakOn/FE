import type { ChatMessage } from "../types/chat.type";
import type { FinishStep } from "../types/finish.type";
import ChatInput from "./ChatSection/ChatInput";
import MessageList from "./ChatSection/MessageList";
import NotificationOverlay from "./NotificationOverlay";
import InterviewTimer from "./VideoSection/InterviewTimer";

interface ChatModeContentProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onPlayAudio: (message: ChatMessage) => void;
  formattedTime: string;
  onSendMessage: (message: string) => void;
  finishStep: FinishStep;
  transcript?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  clearTranscript?: () => void;
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
  onPlayAudio,
  formattedTime,
  onSendMessage,
  finishStep,
  transcript,
  inputValue,
  onInputChange,
  clearTranscript,
}: ChatModeContentProps) => {
  // 전송 후 transcript 초기화를 포함한 wrapper
  const handleSend = (message: string) => {
    onSendMessage(message);
    clearTranscript?.();
  };
  return (
    <div className="relative h-[65vh] bg-white rounded-2xl overflow-hidden flex flex-col">

      <MessageList messages={messages} onPlayAudio={onPlayAudio} />
      <ChatInput
        onSend={handleSend}
        disabled={isLoading}
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
    </div>
  );
};

export default ChatModeContent;
