import useNavigation from '@/hooks/useNavigation';

type NotFavsProps = {
  locationText?: string;
  moveTo?: string;
};

const NotFavs = ({ locationText = '아래에서', moveTo }: NotFavsProps) => {
  const { navigateTo } = useNavigation();

  const handleClick = () => {
    if (!moveTo) return;
    navigateTo(moveTo);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-center text-center text-[1.2rem] text-gray-400 pr-[1.462rem]">
      <p className="font-bold leading-[1.4]">아직 설정된 상대 역할이 없어요</p>
      <p className="font-medium leading-[1.35]">
        <span
          className={moveTo ? 'cursor-pointer underline' : ''}
          onClick={handleClick}
        >
          {locationText}
        </span>{' '}
        사람 · 직무 · 상황을 선택해
        <br />
        연습할 상대를 미리 만들어보세요
      </p>
    </div>
  );
};

export default NotFavs;
