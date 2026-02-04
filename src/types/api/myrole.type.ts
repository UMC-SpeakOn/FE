import type { JobItem, SituationItem } from '@/pages/my-role/types/myrole.type';

// 모든 아바타 조회(통신/UI 공용)
export interface AvatarItem {
  id: number;
  name: string;
  imgUrl: string;
  nationality: string;
  age: number;
}

// 롤 추가 요청
export type AddMyRoleRequest = {
  avatarId: AvatarItem['id'];
  job: JobItem['value'];
  situation: SituationItem['value'];
};

// 롤 추가 응답
export type AddMyRoleResult = {
  myRoleId: number;
  avatarId: number;
  avatarName: string;
  job: JobItem['value'];
  situation: SituationItem['value'];
};
