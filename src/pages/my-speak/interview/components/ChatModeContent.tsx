import type { ChatMessage } from "../types/chat.type";
import ChatInput from "./ChatSection/ChatInput";
import MessageList from "./ChatSection/MessageList";
import InterviewTimer from "./VideoSection/InterviewTimer";

interface ChatModeContentProps {
  formattedTime: string;
  messages: ChatMessage[];
  isLoading: boolean;
  onPlayAudio: (message: ChatMessage) => void;
  onSendMessage: (message: string) => void;
}

/**
 * ChatModeContent - 채팅 모드 컨텐츠
 *
 * @description
 * 채팅 모드에서 표시되는 메시지 리스트, 입력창, 타이머를 포함합니다.
 */
const ChatModeContent = ({
  formattedTime,
  messages,
  isLoading,
  onPlayAudio,
  onSendMessage,
}: ChatModeContentProps) => {
  return (
    <div className="relative h-[48vh] bg-white rounded-2xl overflow-hidden flex flex-col">
      {/* 타이머 표시 (채팅 모드) */}
      <InterviewTimer formattedTime={formattedTime} variant="chat" />

      <MessageList messages={messages} onPlayAudio={onPlayAudio} />
      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatModeContent;
