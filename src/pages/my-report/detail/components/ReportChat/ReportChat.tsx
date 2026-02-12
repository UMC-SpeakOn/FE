import { useEffect } from 'react';

import { useReportDetailStore } from '@/stores/my-report/detail.store';

import { useReportLogs } from '../../hooks/useReportLogs';
import ReportSection from '../common/ReportSection/ReportSection';
import ChatCard from './ChatCard/ChatCard';

interface Props {
  viewUUID: string | null;
}

const ReportChat = ({ viewUUID }: Props) => {
  const { report } = useReportDetailStore();
  const reportId = report?.reportId;

  const { logs, isLoading } = useReportLogs(reportId, viewUUID);

  useEffect(() => {
    if (!reportId) return;

    const key = `report-${reportId}`;

    return () => {
      sessionStorage.removeItem(key);
    };
  }, [reportId]);

  const chatLogs = logs.map((log) => ({
    id: log.messageId,
    role: log.senderRole,
    speakerName: log.senderRole === 'AI' ? 'SpeakOn' : 'You',
    avatarUrl:
      log.senderRole === 'AI'
        ? (report?.sessionSummary.avatarImgUrl ?? '')
        : '',
    message: log.content,
  }));

  return (
    <ReportSection
      title="대화 로그"
      description={`무료 로그 열람 ${report?.usedLogViewCount}/${report?.maxLogViewCount}회 사용 완료`}
    >
      <ChatCard
        data={chatLogs}
        isLocked={report?.isLogLocked ?? true}
        isLoading={!reportId || isLoading}
      />
    </ReportSection>
  );
};

export default ReportChat;
