import type { LoginItem, DecorationItem } from '@/pages/login/types/login.type';

import Google from '@/assets/images/icons/google.svg';
import Kakao from '@/assets/images/icons/kakao.svg';
import NavPurple from '@/assets/images/icons/nav-purple.svg';
import Nav from '@/assets/images/icons/nav.svg';

export const loginData: LoginItem[] = [
  {
    id: 1,
    icon: Google,
    text: '구글로 시작하기',
    alt: 'google',
    bgColor: 'bg-white',
  },
  {
    id: 2,
    icon: Kakao,
    text: '카카오로 시작하기',
    alt: 'kakao',
    bgColor: 'bg-yellow',
  },
];

export const DECORATIONS1: DecorationItem[] = [
  {
    src: NavPurple,
    alt: 'nav-purple',
    className: 'absolute w-[4.189rem] -top-20 left-0 -rotate-50',
  },
  {
    src: Nav,
    alt: 'nav',
    className: 'absolute w-[1.861rem] -top-3 -left-3',
  },
  {
    src: NavPurple,
    alt: 'nav-purple',
    className: 'absolute w-[2.82rem] top-13 -right-5 -rotate-30',
  },
];

export const DECORATIONS2: DecorationItem[] = [
  {
    src: NavPurple,
    alt: 'nav-purple',
    className: 'absolute w-[4.189rem] -top-22 left-[25%] -rotate-40',
  },
];

export const DECORATIONS3: DecorationItem[] = [
  {
    src: NavPurple,
    alt: 'nav-purple',
    className:
      'absolute w-[8.613rem] -top-13 right-[5.2rem] -rotate-[29.62deg]',
  },
  {
    src: NavPurple,
    alt: 'nav-purple',
    className: 'absolute w-[7.7rem] top-[40%] -left-3 -rotate-30',
  },
  {
    src: NavPurple,
    alt: 'nav-purple',
    className: 'absolute w-[11.35rem] top-[45%] -right-5',
  },
];
