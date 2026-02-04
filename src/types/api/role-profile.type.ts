// 내 모든 롤 조회(통신/UI 공용)
export interface RoleProfileApiItem {
  myRoleId: number;
  avatarImgUrl: string;
  avatarName: string;
  avatarAge: number;
  avatarNationality: string;
  job: string;
  situation: string;
}

// 내 모든 롤 조회 응답
export interface RoleProfileListResponse {
  roles: RoleProfileApiItem[];
  totalCount: number;
}

// 삭제
export interface DeleteRoleProfileResponse {
  myRoleId: number;
  message: string;
}
