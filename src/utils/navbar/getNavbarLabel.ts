import { DEFAULT_NAVBAR_LABEL, NAVBAR_ITEMS } from '@/constants/navbar';

export const getNavbarLabel = (pathname: string) => {
  return (
    NAVBAR_ITEMS.find((item) => item.match(pathname))?.label ??
    DEFAULT_NAVBAR_LABEL
  );
};
