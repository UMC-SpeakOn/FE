interface SettingProps {
  onDeleteAccount: () => void;
}

const Setting = ({ onDeleteAccount }: SettingProps) => {
  return (
    <div className="w-full flex flex-col gap-[0.83rem] font-semibold text-[1.6rem] leading-none">
      <button className="w-full py-[1.4rem] border-[0.1rem] border-gray-100 rounded-[1rem] text-gray-400">
        로그아웃
      </button>

      <button
        type="button"
        onClick={onDeleteAccount}
        className="w-full py-[1.4rem] border-[0.1rem] border-gray-100 rounded-[1rem] text-gray-300 bg-gray-50"
      >
        계정삭제
      </button>
    </div>
  );
};

export default Setting;
