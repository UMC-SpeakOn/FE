export type SettingStep = 1 | 2;

export type SettingStepSectionProps = {
  stepNumber?: number;
  title?: string;
  done: boolean;
  isLast?: boolean;
  hideNumber?: boolean;
  children: React.ReactNode;
};

// 더미데이터 타입
export interface AiItem {
  id: number;
  name: string;
  job: string;
  situation: string;
  city: string;
  age: number;
  imageUrl: string;
}

export interface GoalItem {
  id: number;
  label: string;
}
