import { useMutation } from '@/hooks/useApi';
import useNavigation from '@/hooks/useNavigation';
import type {
  KakaoLoginRequest,
  KakaoLoginResult,
} from '@/types/api/login.type';
import type { ServerApiResponse } from '@/types/api/server.type';
import { tokenManager } from '@/utils/apiClient';

export const useKakaoLogin = () => {
  const { navigateTo } = useNavigation();

  return useMutation<ServerApiResponse<KakaoLoginResult>, KakaoLoginRequest>(
    (data) => ({
      method: 'POST',
      url: '/auth/kakao',
      data,
      authRequired: false,
    }),
    {
      onSuccess: (response) => {
        const data = response as ServerApiResponse<KakaoLoginResult>;

        if (!data.isSuccess) {
          console.error(data.message);
          return;
        }

        const { userId, accessToken, refreshToken } = data.result;

        tokenManager.setAccessToken(accessToken);
        tokenManager.setRefreshToken(refreshToken);
        localStorage.setItem('userId', String(userId));

        // console.log('카카오 로그인 성공, userId:', userId);
        navigateTo('/my-role');
      },

      onError: (error) => {
        console.error('카카오 로그인 실패', error);
      },
    },
  );
};
