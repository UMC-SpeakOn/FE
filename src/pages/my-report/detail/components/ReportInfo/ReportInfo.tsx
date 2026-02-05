import type { ReportDetailResult } from '@/types/api/myreport.type';

import ReportSection from '../common/ReportSection/ReportSection';
import DifficultyCard from './DifficultyCard/DifficultyCard';
import InfoCard from './InfoCard/InfoCard';
import ReviewCard from './ReviewCard/ReviewCard';

interface ReportInfoProps {
  data: ReportDetailResult['sessionSummary'];
  difficulty: number;
  review: string;
  onChangeDifficulty: (v: number) => void;
  onChangeReview: (v: string) => void;
}

const ReportInfo = ({
  data,
  difficulty,
  review,
  onChangeDifficulty,
  onChangeReview,
}: ReportInfoProps) => {
  return (
    <div className="flex flex-col gap-[2.8rem]">
      <div className="grid grid-cols-2 gap-[1.7rem]">
        <ReportSection title="시간">
          <InfoCard text={data.totalTime} />
        </ReportSection>

        <ReportSection title="문장 수">
          <InfoCard text={`${data.sentenceCount}문장`} />
        </ReportSection>
      </div>

      <ReportSection title="난이도" description="눌러서 수정할 수 있어요">
        <DifficultyCard value={difficulty} onChange={onChangeDifficulty} />
      </ReportSection>

      <ReportSection title="소감">
        <ReviewCard text={review} onChange={onChangeReview} maxLength={120} />
      </ReportSection>
    </div>
  );
};

export default ReportInfo;
