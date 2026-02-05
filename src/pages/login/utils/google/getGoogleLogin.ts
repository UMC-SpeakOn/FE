import { getRedirectUri } from '@/pages/login/utils/getRedirectUri';

const GoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const getGoogleLogin = () => {
  const redirectUri = getRedirectUri('google');
  const scope = 'email profile';

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${GoogleClientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}`;

  window.location.href = url;
};
