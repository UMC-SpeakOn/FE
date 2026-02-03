export const getKakaoCode = (): string | null => {
  return new URL(window.location.href).searchParams.get('code');
};
