import { initKakao } from './initKakao';
import { getRedirectUri } from './getRedirectUri';

export const getKakaoLogin = () => {
  initKakao();

  window.Kakao.Auth.authorize({
    redirectUri: getRedirectUri(),
  });
};
