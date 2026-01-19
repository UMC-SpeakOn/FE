type TitleProps = {
  title: string;
  description: string;
};

const Title = ({ title, description }: TitleProps) => {
  return (
    <div className="w-full flex items-center gap-4 pr-[1.462rem]">
      <p className="whitespace-nowrap font-bold text-[2.2rem] text-black leading-none">
        {title}
      </p>

      <div className="w-full relative flex items-center">
        <div className="w-0 h-0 border-y-[0.65rem] border-y-transparent border-r-[1.561rem] border-r-purple-50" />
        <div className="absolute py-[0.9rem] px-[1.485rem] bg-purple-50 rounded-[3.431rem] ml-4">
          <p className="font-semibold text-[1.1rem] leading-none text-purple-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Title;
