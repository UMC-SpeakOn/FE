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

export interface PersonItem {
  id: number;
  name: string;
  imgUrl: string;
  nationality: string;
  age: number;
}

export type JobItem = {
  id: number;
  label: string;
  value: string;
};

export type SituationItem = {
  id: number;
  label: string;
  value: string;
};

export type AddMyRoleRequest = {
  avatarId: PersonItem['id'];
  job: JobItem['value'];
  situation: SituationItem['value'];
};

export type AddMyRoleResult = {
  myRoleId: number;
  avatarId: number;
  avatarName: string;
  job: JobItem['value'];
  situation: SituationItem['value'];
};
