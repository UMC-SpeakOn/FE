import { useMutation } from '@/hooks/useApi';
import useNavigation from '@/hooks/useNavigation';
import type {
  OAuthLoginRequest,
  OAuthLoginResult,
  OAuthProvider,
} from '@/types/api/login.type';
import type { ServerApiResponse } from '@/types/api/server.type';
import { tokenManager } from '@/utils/apiClient';

export const useLogin = (provider: OAuthProvider) => {
  const { navigateTo } = useNavigation();

  return useMutation<ServerApiResponse<OAuthLoginResult>, OAuthLoginRequest>(
    (data) => ({
      method: 'POST',
      url: `/auth/${provider}`,
      data,
      authRequired: false,
    }),
    {
      onSuccess: (response) => {
        const data = response as ServerApiResponse<OAuthLoginResult>;

        if (!data.isSuccess) {
          console.error(data.message);
          return;
        }

        // 추후 온보딩 개발되면 주석 풀기
        // const { userId, accessToken, refreshToken, isOnboarded } = data.result;
        const { userId, accessToken, refreshToken } = data.result;

        tokenManager.setAccessToken(accessToken);
        tokenManager.setRefreshToken(refreshToken);
        localStorage.setItem('userId', String(userId));

        // navigateTo(isOnboarded ? '/my-role' : '/onboarding');
        navigateTo('/my-role');
      },

      onError: (error) => {
        console.error(`${provider} 로그인 실패`, error);
      },
    },
  );
};
