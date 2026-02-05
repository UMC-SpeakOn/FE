import type { OAuthProvider } from '@/types/api/login.type';

export const getRedirectUri = (provider: OAuthProvider) => {
  const origin = window.location.origin;

  const base = origin.includes('localhost')
    ? 'http://localhost:5173'
    : 'https://umc-speakon.netlify.app';

  return `${base}/login/oauth2/code/${provider}`;
};
