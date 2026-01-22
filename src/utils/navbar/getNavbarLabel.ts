import { NAVBAR_ITEMS } from '@/mocks/navbarData';

export const getNavbarLabel = (pathname: string) => {
  return NAVBAR_ITEMS.find((item) => item.match(pathname))?.label ?? 'My Role';
};
