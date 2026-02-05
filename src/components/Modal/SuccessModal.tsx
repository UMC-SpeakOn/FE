import Check from '@/assets/images/icons/check.svg';
import Close from '@/assets/images/icons/close.svg';

interface SuccessModalProps {
  open: boolean;
  title: string;
  descriptions: string[];
  onClose: () => void;
}

const SuccessModal = ({
  open,
  onClose,
  title,
  descriptions,
}: SuccessModalProps) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex items-center justify-center bg-black/50 shadow-(--shadow-modal)"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-[29.4rem] h-[16.3rem] rounded-2xl bg-white flex justify-center pt-[2.8rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={Close}
          alt="close"
          onClick={onClose}
          className="w-[1.9rem] cursor-pointer absolute right-[1.3rem] top-4"
        />

        <div className="flex flex-col gap-[1.2rem] items-center">
          <img src={Check} alt="check" className="w-[3.9rem]" />
          <p className="text-[1.5rem] font-bold text-black text-center leading-none">
            {title}
          </p>
          <div className="text-[1.2rem] font-semibold text-black text-center leading-[1.3] whitespace-pre-line">
            {descriptions.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
