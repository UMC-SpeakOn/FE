import { useMutation } from '@/hooks/useApi';
import useNavigation from '@/hooks/useNavigation';
import { tokenManager } from '@/utils/apiClient';

interface KakaoLoginRequest {
  code: string;
  redirectUri: string;
}

interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

interface KakaoLoginResult {
  userId: number;
  accessToken: string;
  refreshToken: string;
}

export const useKakaoLogin = () => {
  const { navigateTo } = useNavigation();

  return useMutation<ApiResponse<KakaoLoginResult>, KakaoLoginRequest>(
    (data) => ({
      method: 'POST',
      url: '/auth/kakao',
      data,
      authRequired: false,
    }),
    {
      onSuccess: (response) => {
        const data = response as ApiResponse<KakaoLoginResult>;

        if (!data.isSuccess) {
          console.error(data.message);
          return;
        }

        const { userId, accessToken, refreshToken } = data.result;

        tokenManager.setAccessToken(accessToken);
        tokenManager.setRefreshToken(refreshToken);
        localStorage.setItem('userId', String(userId));

        console.log('카카오 로그인 성공, userId:', userId);
        navigateTo('/my-role');
      },

      onError: (error) => {
        console.error('카카오 로그인 실패', error);
      },
    },
  );
};
