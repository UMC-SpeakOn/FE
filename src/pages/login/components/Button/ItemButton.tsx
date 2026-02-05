import { getKakaoLogin } from '@/pages/login/utils/kakao/getKakaoLogin';

import type { LoginItem } from '../../types/login.type';
import { getGoogleLogin } from '../../utils/google/getGoogleLogin';

interface ItemButtonProps {
  item: LoginItem;
}

const loginHandlers = {
  kakao: getKakaoLogin,
  google: getGoogleLogin,
} as const;

const ItemButton = ({ item }: ItemButtonProps) => {
  const { icon, text, alt, bgColor, provider } = item;

  const handleClick = () => {
    loginHandlers[provider]();
  };

  return (
    <button
      className={`w-full py-[1.45rem] flex items-center justify-center gap-[1.4rem] rounded-full ${bgColor}`}
      onClick={handleClick}
    >
      <img src={icon} alt={alt} className="w-[2.4rem]" />
      <p className="min-w-[11.5rem] text-left font-semibold text-[1.6rem] text-black leading-none whitespace-nowrap">
        {text}
      </p>
    </button>
  );
};

export default ItemButton;
