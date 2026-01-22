import type { NavbarItem } from '@/types/navbar/navbar.type';

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
