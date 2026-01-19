import { HEADER_ITEMS } from '@/mocks/headerData';

export const getHeaderLabel = (pathname: string) => {
  return HEADER_ITEMS.find((item) => item.match(pathname))?.label ?? 'My Role';
};
