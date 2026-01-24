import type { NavbarItem } from '@/types/navbar/navbar.type';

export const DEFAULT_NAVBAR_LABEL = 'My Role';

export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    label: 'My Role',
    match: (pathname) => pathname.startsWith('/my-role'),
  },
  {
    label: 'My Speak',
    match: (pathname) => pathname.startsWith('/my-speak'),
  },
];
