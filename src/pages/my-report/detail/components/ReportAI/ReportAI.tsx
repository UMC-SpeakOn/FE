import type { ReportData } from '../../types/report.type';
import ReportSection from '../common/ReportSection/ReportSection';
import AICard from './AICard/AICard';

interface ReportAIProps {
  data: ReportData;
}

const ReportAI = ({ data }: ReportAIProps) => {
  return (
    <div className="w-full flex flex-col gap-[2.8rem]">
      <ReportSection
        title="AI Insight Card"
        description="이번 대화를 SpeakOn AI가 정리했어요"
      >
        <AICard data={data.insightCard} />
      </ReportSection>
    </div>
  );
};

export default ReportAI;
