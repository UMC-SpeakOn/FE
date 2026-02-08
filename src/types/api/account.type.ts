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
}
