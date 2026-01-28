import Error from '@/assets/images/icons/error.svg';

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
}

const ErrorModal = ({ open, onClose }: ErrorModalProps) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 flex items-center justify-center bg-black/50 shadow-(--shadow-modal)"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-[29.4rem] h-[13.7rem] rounded-2xl bg-white flex justify-center pt-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-[1.2rem] items-center">
          <img src={Error} alt="error" className="w-[3.9rem]" />
          <p className="text-[1.5rem] font-bold text-black text-center leading-none">
            이미 동일한 조건의 롤이 있어요
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
