import type { RoleProfileItem } from '@/types/role/role-profile.type';

export type SettingStep = 1 | 2;

export type SettingStepSectionProps = {
  stepNumber?: number;
  title?: string;
  done: boolean;
  isLast?: boolean;
  hideNumber?: boolean;
  children: React.ReactNode;
};

export type AiItem = RoleProfileItem;

export interface GoalItem {
  id: number;
  label: string;
}
