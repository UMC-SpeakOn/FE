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

  const { report, viewUUID, isLoading, isError, refetch } =
    useReportDetail(reportId);

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

  const isInitialLoading = isLoading && !report;

  const handleSave = async () => {
    if (!report) return;

    const difficulty = draft.difficulty ?? report.sessionSummary.difficulty;

    const review = draft.review ?? report.userReflection ?? '';

    const result = await updateReflection({
      reportId: report.reportId,
      feedback: review,
      difficulty,
    });

    if (result !== null) {
      await refetch();
      alert('저장되었습니다.');
      setDraft({});
    }
  };

  return (
    <>
      <PrevNavbar
        title={
          report
            ? `${report.sessionSummary.job} 직무 ${report.sessionSummary.situation}`
            : ''
        }
        path="/my-report"
      />

      <div className="relative white-pageContainer pr-[1.597rem] gap-[3.3rem]">
        {isInitialLoading && (
          <div className="absolute inset-0 flex justify-center items-center z-10">
            <Spinner color="var(--color-purple-700)" />
          </div>
        )}

        {isError && !isLoading && (
          <div className="flex justify-center items-center py-[6rem] text-gray-400">
            리포트를 불러올 수 없습니다.
          </div>
        )}

        {report && (
          <>
            {(() => {
              const difficulty =
                draft.difficulty ?? report.sessionSummary.difficulty;

              const review = draft.review ?? report.userReflection ?? '';

              const isDirty =
                difficulty !== report.sessionSummary.difficulty ||
                review !== (report.userReflection ?? '');

              return (
                <>
                  <ReportInfo
                    data={report.sessionSummary}
                    difficulty={difficulty}
                    review={review}
                    onChangeDifficulty={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        difficulty: value,
                      }))
                    }
                    onChangeReview={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        review: value,
                      }))
                    }
                  />

                  <ReportBar />
                  <ReportAI data={report.aiInsightCard} />
                  <ReportBar />
                  <ReportChat viewUUID={viewUUID} />

                  {isDirty && (
                    <ReportButton
                      text={isSaving ? '저장 중...' : '저장하기'}
                      onClick={handleSave}
                      disabled={isSaving}
                    />
                  )}
                </>
              );
            })()}
          </>
        )}
      </div>
    </>
  );
};

export default Detail;
