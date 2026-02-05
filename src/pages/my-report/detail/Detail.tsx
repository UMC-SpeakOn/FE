import { useParams } from 'react-router-dom';

import PrevNavbar from '@/components/Navbar/PrevNavbar';

import ReportBar from './components/common/ReportBar/ReportBar';
import ReportButton from './components/common/ReportButton/ReportButton';
import ReportAI from './components/ReportAI/ReportAI';
import ReportChat from './components/ReportChat/ReportChat';
import ReportInfo from './components/ReportInfo/ReportInfo';
import { useReportDetail } from './hooks/useReportDetail';
import { useReportLogs } from './hooks/useReportLogs';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = Number(id);

  const { report, isLoading, isError } = useReportDetail(reportId);
  const { logs, isLoading: isLogsLoading } = useReportLogs(reportId);

  // console.log('report', report);

  if (isLoading || isLogsLoading) {
    return <div>로딩 중...</div>;
  }

  if (isError || !report || !logs) {
    return <div>리포트를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <PrevNavbar title={report.sessionSummary.job} path={'/my-report'} />

      <div className="white-pageContainer pr-[1.597rem] gap-[3.3rem]">
        <ReportInfo
          data={report.sessionSummary}
          reflection={report.userReflection}
        />

        <ReportBar />

        <ReportAI data={report.aiInsightCard} />

        <ReportBar />

        <ReportChat
          data={logs}
          aiAvatarUrl={report.sessionSummary.avatarImgUrl}
        />

        <ReportButton text="저장하기" />
      </div>
    </>
  );
};

export default Detail;
