// 단계 UI
export type SettingStep = 1 | 2;

export type SettingStepSectionProps = {
  stepNumber?: number;
  title?: string;
  done: boolean;
  isLast?: boolean;
  hideNumber?: boolean;
  children: React.ReactNode;
};

// 목표 설정 UI
export interface GoalItem {
  id: number;
  label: string;
  targetQuestionCount: number;
}
