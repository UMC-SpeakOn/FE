import type { ChatMessage } from "../types/chat.type";
import type { FinishStep } from "../types/finish.type";
import ChatInput from "./ChatSection/ChatInput";
import MessageList from "./ChatSection/MessageList";
import NotificationOverlay from "./NotificationOverlay";

interface ChatModeContentProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onPlayAudio: (message: ChatMessage) => void;
  onSendMessage: (message: string) => void;
  finishStep: FinishStep;
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
  onSendMessage,
  finishStep,
}: ChatModeContentProps) => {
  return (
    <div className="relative h-[48vh] bg-white rounded-2xl overflow-hidden flex flex-col">
      <MessageList messages={messages} onPlayAudio={onPlayAudio} />
      <ChatInput onSend={onSendMessage} disabled={isLoading} />

      {/* Step 1: 알림 오버레이 (부분 화면) */}
      {finishStep === "notification" && <NotificationOverlay />}
    </div>
  );
};

export default ChatModeContent;
