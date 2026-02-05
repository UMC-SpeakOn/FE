import Delete from '@/assets/images/icons/delete.svg';
import ModalIcon from '@/assets/images/icons/modal.svg';

interface ProfileModalProps {
  title: string;
  descriptions: string[];
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
}

const ProfileModal = ({
  title,
  descriptions,
  cancelText = '취소',
  confirmText = '삭제하기',
  onCancel,
  onConfirm,
  onClose,
}: ProfileModalProps) => {
  return (
    <div
      className="fixed inset-y-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] bg-black/50"
      onClick={onClose}
    >
      <div className="relative w-full">
        <div className="flex min-h-screen items-center justify-center px-[1.6rem]">
          <div
            className="relative flex flex-col gap-[3rem] px-[2.05rem] py-[2.08rem] bg-white rounded-[1.2rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-[1.6rem] right-[1.6rem]"
            >
              <img src={Delete} alt="닫기" className="w-[1.6rem] h-[1.6rem]" />
            </button>

            <div className="flex flex-col items-center gap-[1.2rem]">
              <img src={ModalIcon} alt="" className="w-[3.9rem]" />
              <p className="font-bold text-[1.5rem] leading-none text-black">
                {title}
              </p>
            </div>

            <div className="flex flex-col gap-[0.6rem] font-semibold text-[1.2rem] leading-[1.3] text-gray-500 text-center whitespace-pre-line">
              {descriptions.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            <div className="min-w-[25.3rem] grid grid-cols-2 gap-[0.7rem]">
              <button
                type="button"
                onClick={onCancel ?? onClose}
                className="py-[1.4rem] border border-gray-100 font-bold text-[1.5rem] text-gray-400 rounded-[1rem]"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="py-[1.4rem] bg-gray-50 font-bold text-[1.5rem] text-gray-300 rounded-[1rem]"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
