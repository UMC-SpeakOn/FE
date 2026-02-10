import type { ReportDetailResult } from '@/types/api/myreport.type';

import type { InsightCard } from '../../types/myreport.type';
import ReportSection from '../common/ReportSection/ReportSection';
import AICard from './AICard/AICard';

type AiInsightCard = ReportDetailResult['aiInsightCard'];

interface ReportAIProps {
  data: AiInsightCard;
}

const ReportAI = ({ data }: ReportAIProps) => {
  // console.log(data);
  const toneAnalysis = data.toneAnalysis ?? {
    userTone: null,
    expectedTone: null,
  };

  const insightCard: InsightCard = {
    tabs: ['핵심요약', '톤 분석', '근거', '교정'],
    items: [
      {
        tab: '핵심요약',
        title: 'Summary On',
        summary: data.aiSummary,
      },
      {
        tab: '톤 분석',
        title: '대화 톤은 어땠을까요?',
        tones: [
          {
            label: '나의 대화 톤',
            value: toneAnalysis.userTone ?? 'None',
          },
          {
            label: '상황에 기대된 톤',
            value: toneAnalysis.expectedTone ?? 'None',
          },
        ],
      },
      {
        tab: '근거',
        title: '이런 점이 보였어요',
        evidences: data.aiReason,
      },
      {
        tab: '교정',
        title: '이 문장을 이렇게 말할 수도 있어요',
        corrections: data.corrections.map((c) => ({
          before: c.original,
          after: c.corrected,
        })),
      },
    ],
  };

  return (
    <div className="w-full flex flex-col gap-[2.8rem]">
      <ReportSection
        title="AI Insight Card"
        description="이번 대화를 AI가 정리했어요"
      >
        <AICard data={insightCard} />
      </ReportSection>
    </div>
  );
};

export default ReportAI;
