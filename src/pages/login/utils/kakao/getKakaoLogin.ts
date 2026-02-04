import { getRedirectUri } from './getRedirectUri';
import { initKakao } from './initKakao';

export const getKakaoLogin = () => {
  initKakao();

  window.Kakao.Auth.authorize({
    redirectUri: getRedirectUri(),
  });
};
