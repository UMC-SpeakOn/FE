type TitleProps = {
  title: string;
  description: string;
};

const Title = ({ title, description }: TitleProps) => {
  return (
    <div className="w-full flex items-center gap-[0.7rem] pr-[1.462rem]">
      <p className="whitespace-nowrap font-semibold text-[1.6rem] text-black leading-none">
        {title}
      </p>

      <div className="w-full relative flex items-center">
        <div className="w-0 h-0 border-y-[0.465rem] border-y-transparent border-r-[0.797rem] border-r-purple-50" />
        <div className="absolute py-[0.584rem] px-[0.943rem] bg-purple-50 rounded-[3.431rem] ml-2.5">
          <p className="font-semibold text-[1.2rem] leading-none text-purple-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Title;
