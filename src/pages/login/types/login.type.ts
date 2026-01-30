export interface LoginItem {
  id: number;
  icon: string;
  text: string;
  alt: string;
  bgColor: string;
  provider: 'kakao' | 'google';
}

export interface DecorationItem {
  src: string;
  alt: string;
  className: string;
}
