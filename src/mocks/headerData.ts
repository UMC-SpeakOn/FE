import type { HeaderItem } from '@/types/header/header.type';

export const HEADER_ITEMS: HeaderItem[] = [
  {
    label: 'My Role',
    match: (pathname) => pathname.startsWith('/my-role'),
  },
  {
    label: 'My Speak',
    match: (pathname) => pathname.startsWith('/my-speak'),
  },
];
