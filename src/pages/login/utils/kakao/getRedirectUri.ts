export const getRedirectUri = () => {
  const origin = window.location.origin;

  if (origin.includes('localhost')) {
    return 'http://localhost:5173/login/oauth2/code/kakao';
  }

  return 'https://umc-speakon.netlify.app/login/oauth2/code/kakao';
};
