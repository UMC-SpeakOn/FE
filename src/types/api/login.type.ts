// 카카오 로그인 요청
export interface KakaoLoginRequest {
  code: string;
  redirectUri: string;
}

// 카카오 로그인 응답
export interface KakaoLoginResult {
  userId: number;
  accessToken: string;
  refreshToken: string;
}
