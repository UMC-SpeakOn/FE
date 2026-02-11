import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PrevNavbar from '@/components/Navbar/PrevNavbar';
import Spinner from '@/components/Spinner/Spinner';
import { useReportDetailStore } from '@/stores/my-report/detail.store';

import ReportBar from './components/common/ReportBar/ReportBar';
import ReportButton from './components/common/ReportButton/ReportButton';
import ReportAI from './components/ReportAI/ReportAI';
import ReportChat from './components/ReportChat/ReportChat';
import ReportInfo from './components/ReportInfo/ReportInfo';
import { useReportDetail } from './hooks/useReportDetail';
import { useReportUpdate } from './hooks/useReportUpdate';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id ? Number(id) : undefined;

  const { report, isLoading, isError } = useReportDetail(reportId);
  const { mutate: updateReflection, isLoading: isSaving } = useReportUpdate();
  const { setReport, reset } = useReportDetailStore();

  const [draft, setDraft] = useState<{
    difficulty?: number;
    review?: string;
  }>({});

  useEffect(() => {
    if (report) setReport(report);
    return () => reset();
  }, [report, setReport, reset]);

  const handleSave = async () => {
    if (!report || difficulty === undefined) return;

    const result = await updateReflection({
      reportId: report.reportId,
      feedback: review,
      difficulty,
    });

    if (result !== null) {
      alert('저장되었습니다.');
      setDraft({});
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner color="var(--color-purple-700)" />
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="flex justify-center items-center py-[6rem] text-gray-400">
        리포트를 불러올 수 없습니다.
      </div>
    );
  }

  const difficulty = draft.difficulty ?? report.sessionSummary.difficulty;

  const review = draft.review ?? report.userReflection ?? '';

  const isDirty =
    difficulty !== report.sessionSummary.difficulty ||
    review !== (report.userReflection ?? '');

  return (
    <>
      <PrevNavbar
        title={`${report.sessionSummary.job} 직무 ${report.sessionSummary.situation}`}
        path="/my-report"
      />

      <div className="white-pageContainer pr-[1.597rem] gap-[3.3rem]">
        <ReportInfo
          data={report.sessionSummary}
          difficulty={difficulty}
          review={review}
          onChangeDifficulty={(value) =>
            setDraft((prev) => ({ ...prev, difficulty: value }))
          }
          onChangeReview={(value) =>
            setDraft((prev) => ({ ...prev, review: value }))
          }
        />

        <ReportBar />
        <ReportAI data={report.aiInsightCard} />
        <ReportBar />

        <ReportChat />

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
