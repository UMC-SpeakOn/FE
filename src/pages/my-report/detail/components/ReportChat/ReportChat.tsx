import type { ReportData } from '../../types/report.type';
import ReportSection from '../common/ReportSection/ReportSection';
import ChatCard from './ChatCard/ChatCard';

interface ReportChatProps {
  data: ReportData;
}

const ReportChat = ({ data }: ReportChatProps) => {
  return (
    <div className="w-full flex flex-col">
      <ReportSection title="대화 로그">
        <ChatCard data={data.chatLogs} />
      </ReportSection>
    </div>
  );
};

export default ReportChat;
