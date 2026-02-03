// 단계 UI
export type AddStep = 1 | 2 | 3;

export type AddStepSectionProps = {
  stepNumber?: number;
  title?: string;
  done: boolean;
  isLast?: boolean;
  hideNumber?: boolean;
  children: React.ReactNode;
};

// 롤 추가 직무 UI
export type JobItem = {
  id: number;
  label: string;
  value: string;
};

// 롤 추가 상황 UI
export type SituationItem = {
  id: number;
  label: string;
  value: string;
};
