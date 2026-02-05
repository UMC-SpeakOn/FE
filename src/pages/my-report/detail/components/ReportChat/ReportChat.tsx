import type { ReportLogResult } from '@/types/api/myreport.type';

import ReportSection from '../common/ReportSection/ReportSection';
import ChatCard from './ChatCard/ChatCard';

interface ReportChatProps {
  data: ReportLogResult[];
  aiAvatarUrl: string;
}

const ReportChat = ({ data, aiAvatarUrl }: ReportChatProps) => {
  const chatLogs = data.map((log) => {
    const isAI = log.senderRole === 'AI';

    return {
      id: log.messageId,
      role: log.senderRole,
      speakerName: isAI ? 'SpeakOn' : 'You',
      avatarUrl: isAI ? aiAvatarUrl : '',
      message: log.content,
    };
  });

  return (
    <div className="w-full flex flex-col">
      <ReportSection title="대화 로그">
        <ChatCard data={chatLogs} />
      </ReportSection>
    </div>
  );
};

export default ReportChat;
