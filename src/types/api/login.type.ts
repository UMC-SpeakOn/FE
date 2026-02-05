// 공용 OAuth 로그인 요청
export interface OAuthLoginRequest {
  code: string;
  redirectUri: string;
}

// 공용 OAuth 로그인 응답
export interface OAuthLoginResult {
  userId: number;
  accessToken: string;
  refreshToken: string;
  isOnboarded: boolean;
}

export type OAuthProvider = 'kakao' | 'google';
