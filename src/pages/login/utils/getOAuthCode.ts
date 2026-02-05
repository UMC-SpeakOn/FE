export const getOAuthCode = (): string | null => {
  return new URL(window.location.href).searchParams.get('code');
};
