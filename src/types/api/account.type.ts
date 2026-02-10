// 유저 정보
export interface UserApi {
  userId: number;
  nickname: string;
  profileImgUrl: string | null;
  name: string;
  email: string;
  socialType: 'GOOGLE' | 'KAKAO';
  createdAt: string | null;
  isSubscribed: boolean | null;
  subscriptionExpiredAt: string | null;
  isSubscriptionCancelled: boolean | null;
}

// 유저 프로필 수정 요청
export interface EditProfileRequest {
  nickname: string;
  profileImage?: File;
}

// 유저 프로필 수정 응답
export interface EditProfileResponse {
  userId: number;
  nickname: string;
  profileImgUrl: string;
  message: string;
}

// 유저 탈퇴 결과
export interface DeleteProfileResult {
  userId: number;
  message: string;
}
