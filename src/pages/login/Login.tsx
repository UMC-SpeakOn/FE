import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { DECORATIONS1, DECORATIONS2, DECORATIONS3 } from '@/mocks/loginData';
import { getRedirectUri } from '@/pages/login/utils/getRedirectUri';
import type { OAuthProvider } from '@/types/api/login.type';

import ListButton from './components/Button/ListButton';
import ListDecoration from './components/Decoration/ListDecoration';
import { useLogin } from './hooks/useLogin';
import { getOAuthCode } from './utils/getOAuthCode';

const Login = () => {
  const { provider } = useParams<{ provider?: OAuthProvider }>();
  const called = useRef(false);

  const login = useLogin(provider ?? 'kakao');

  useEffect(() => {
    if (!provider) return;
    if (called.current) return;

    const code = getOAuthCode();
    if (!code) return;

    called.current = true;

    login.mutate({
      code,
      redirectUri: getRedirectUri(provider),
    });
  }, [provider, login]);

  if (!provider) {
    return (
      <div className="pageContainer h-screen px-[1.6rem] relative flex flex-col items-center">
        <div className="relative z-10 mt-[30%] flex flex-col gap-[6.827rem] text-center text-white font-bold leading-none">
          <p className="font-unbounded text-[3.866rem]">SpeakOn</p>
          <p className="text-[1.5rem]">
            로그인 후 내 상황에 맞는 연습을 할 수 있어요
          </p>
          <ListDecoration items={DECORATIONS1} />
        </div>

        <div className="absolute bottom-[15%] z-10 w-full px-[1.6rem] flex flex-col gap-[4rem]">
          <div className="flex items-center gap-[1.3rem]">
            <div className="w-full h-[0.1rem] bg-purple-300/80" />
            <p className="font-medium text-[1.4rem] whitespace-nowrap text-purple-200 leading-none">
              로그인/회원가입
            </p>
            <div className="w-full h-[0.1rem] bg-purple-300/80" />
          </div>

          <ListButton />
          <ListDecoration items={DECORATIONS2} />
        </div>

        <ListDecoration items={DECORATIONS3} />
      </div>
    );
  }

  if (login.isLoading)
    return (
      <div className="pageContainer h-screen flex items-center justify-center">
        <p>로그인 처리 중...</p>
      </div>
    );
  if (login.isError)
    return (
      <div className="pageContainer h-screen flex items-center justify-center">
        <p>로그인 실패</p>
      </div>
    );

  return null;
};

export default Login;
