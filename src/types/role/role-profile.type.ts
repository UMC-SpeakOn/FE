export interface RoleProfileItem {
  id: number;
  name: string;
  job: string;
  situation: string;
  city: string;
  age: number;
  imageUrl: string;
}

/* 조회 */
export interface RoleProfileApiItem {
  myRoleId: number;
  avatarImgUrl: string;
  avatarName: string;
  avatarAge: number;
  avatarNationality: string;
  job: string;
  situation: string;
}

export interface RoleProfileListResponse {
  roles: RoleProfileApiItem[];
  totalCount: number;
}

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

/* 삭제 */
export interface DeleteRoleProfileResponse {
  myRoleId: number;
  message: string;
}
