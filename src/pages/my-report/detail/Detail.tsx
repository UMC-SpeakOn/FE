import { useState } from 'react';
import { useParams } from 'react-router-dom';

import PrevNavbar from '@/components/Navbar/PrevNavbar';

import ReportBar from './components/common/ReportBar/ReportBar';
import ReportButton from './components/common/ReportButton/ReportButton';
import ReportAI from './components/ReportAI/ReportAI';
import ReportChat from './components/ReportChat/ReportChat';
import ReportInfo from './components/ReportInfo/ReportInfo';
import { useReportDetail } from './hooks/useReportDetail';
import { useReportLogs } from './hooks/useReportLogs';
import { useReportUpdate } from './hooks/useReportUpdate';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = Number(id);

  const { report, isLoading, isError } = useReportDetail(reportId);
  const { logs, isLoading: isLogsLoading } = useReportLogs(reportId);
  const { mutate: updateReflection, isLoading: isSaving } = useReportUpdate();

  // 편집 상태
  const [difficulty, setDifficulty] = useState<number | null>(null);
  const [review, setReview] = useState('');

  // 초기 체크
  const [initialDifficulty, setInitialDifficulty] = useState<number | null>(
    null,
  );
  const [initialReview, setInitialReview] = useState('');

  // 최초 렌더 초기화
  if (report && difficulty === null) {
    setDifficulty(report.sessionSummary.difficulty);
    setReview(report.userReflection);
    setInitialDifficulty(report.sessionSummary.difficulty);
    setInitialReview(report.userReflection);
  }

  const isDirty =
    initialDifficulty !== null &&
    (difficulty !== initialDifficulty || review !== initialReview);

  if (isLoading || isLogsLoading || difficulty === null) {
    return <div>로딩 중...</div>;
  }

  if (isError || !report) {
    return <div>리포트를 불러올 수 없습니다.</div>;
  }

  const handleSave = () => {
    updateReflection({
      reportId,
      feedback: review,
      difficulty,
    });

    setInitialDifficulty(difficulty);
    setInitialReview(review);
  };

  return (
    <>
      <PrevNavbar title={report.sessionSummary.job} path="/my-report" />

      <div className="white-pageContainer pr-[1.597rem] gap-[3.3rem]">
        <ReportInfo
          data={report.sessionSummary}
          difficulty={difficulty}
          review={review}
          onChangeDifficulty={setDifficulty}
          onChangeReview={setReview}
        />

        <ReportBar />
        <ReportAI data={report.aiInsightCard} />
        <ReportBar />

        <ReportChat
          data={logs}
          aiAvatarUrl={report.sessionSummary.avatarImgUrl}
        />

        {isDirty && (
          <ReportButton
            text={isSaving ? '저장 중...' : '저장하기'}
            onClick={handleSave}
            disabled={isSaving}
          />
        )}
      </div>
    </>
  );
};

export default Detail;
