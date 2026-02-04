import type { RoleProfileApiItem } from '../api/role-profile.type';

// 공용 컴포넌트 roleProfile UI
export interface RoleProfileItem {
  id: number;
  name: string;
  job: string;
  situation: string;
  city: string;
  age: number;
  imageUrl: string;
}

// 매핑
export const mapRoleProfileApiToItem = (
  apiItem: RoleProfileApiItem,
): RoleProfileItem => ({
  id: apiItem.myRoleId,
  name: apiItem.avatarName,
  job: apiItem.job,
  situation: apiItem.situation,
  city: apiItem.avatarNationality,
  age: apiItem.avatarAge,
  imageUrl: apiItem.avatarImgUrl,
});
