const NotSubscribe = () => {
  return (
    <div className="w-full py-[2.4rem] px-[2.1rem] border-[0.1rem] border-gray-100 rounded-[1rem]">
      <div className="flex flex-col gap-[1rem]">
        <p className="font-bold text-gray-400 text-[1.5rem] leading-none">
          무제한으로 대화 로그를 열람하세요
        </p>
        <p className="font-medium text-gray-300 text-[1.3rem] leading-none">
          구독 중인 플랜이 없습니다.
        </p>
      </div>
    </div>
  );
};

export default NotSubscribe;
