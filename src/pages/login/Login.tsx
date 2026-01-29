import Navbar from './components/Navbar/Navbar';
import ListButton from './components/Button/ListButton';
import ListDecoration from './components/Decoration/ListDecoration';
import { DECORATIONS1, DECORATIONS2, DECORATIONS3 } from '@/mocks/loginData';

const Login = () => {
  return (
    <div className="pageContainer h-screen px-[1.6rem] relative flex flex-col items-center">
      <Navbar />

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
};

export default Login;
