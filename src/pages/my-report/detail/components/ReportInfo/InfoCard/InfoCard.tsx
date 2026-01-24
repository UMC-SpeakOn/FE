interface InfoCardProps {
  text: string;
}

const InfoCard = ({ text }: InfoCardProps) => {
  return (
    <div className="w-full rounded-2xl border-[0.1rem] border-gray-100 py-[1.75rem] px-[1.4rem]">
      <p className="font-bold text-[1.5rem] leading-none text-black">{text}</p>
    </div>
  );
};

export default InfoCard;
