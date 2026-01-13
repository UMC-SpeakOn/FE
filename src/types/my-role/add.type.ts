// ui 타입
export type AddStep = 1 | 2 | 3;

export type AddStepSectionProps = {
  stepNumber?: number;
  title?: string;
  done: boolean;
  isLast?: boolean;
  hideNumber?: boolean;
  children: React.ReactNode;
};

// 더미데이터 타입
export type PersonItem = {
  id: number;
  name: string;
  city: string;
  age: number;
  imageUrl: string;
};

export type JobItem = {
  id: number;
  label: string;
};

export type SituationItem = {
  id: number;
  label: string;
};
