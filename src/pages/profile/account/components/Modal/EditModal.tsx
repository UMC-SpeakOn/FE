import { useRef, useState } from 'react';

import CloseImg from '@/assets/images/icons/close.svg';
import EditImg from '@/assets/images/icons/edit.svg';
import ProfileImg from '@/assets/images/icons/profile.svg';

interface EditModalProps {
  defaultName: string;
  defaultImage?: string;
  onClose: () => void;
  onSubmit: (data: { name: string; image?: File }) => void;
}

const EditModal = ({
  defaultName,
  defaultImage,
  onClose,
  onSubmit,
}: EditModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(defaultName);
  const [preview, setPreview] = useState<string | undefined>(defaultImage);
  const [file, setFile] = useState<File | undefined>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSave = () => {
    onSubmit({ name, image: file });
  };

  return (
    <div
      className="fixed inset-y-0 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center bg-black/70 max-w-[430px] w-full"
      onClick={onClose}
    >
      <div
        className="px-[2rem] pt-[1.4rem] pb-[2.8rem] bg-white rounded-[1rem] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={CloseImg}
          alt="close"
          onClick={onClose}
          className="absolute top-[1.6rem] right-[1.6rem] w-[1.9rem] cursor-pointer"
        />

        <h2 className="font-bold text-[1.8rem] text-black mb-[2.58rem] leading-none">
          프로필 수정
        </h2>

        <div className="flex items-center gap-[1.9rem] mb-[2.58rem]">
          <div className="relative w-[8rem] h-[8rem]">
            <img
              src={preview || ProfileImg}
              alt="프로필 미리보기"
              className="w-full h-full rounded-full object-cover"
            />

            <img
              src={EditImg}
              alt="edit"
              className="absolute bottom-0 right-0 w-[2.8rem] cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            />
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />

          <div className="flex flex-col gap-[0.8rem]">
            <label className="font-bold text-[1.5rem] leading-none text-black">
              이름
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="입력하세요"
              className="w-[14.7rem] h-[3.5rem] px-[1.3rem] bg-gray-50 border-[0.1rem] border-gray-100 rounded-[1rem] text-[1.4rem] font-medium leading-[1.49] text-black"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-[1.4rem] rounded-[1rem] bg-purple-700 text-white font-bold text-[1.5rem] leading-none"
        >
          저장하기
        </button>
      </div>
    </div>
  );
};

export default EditModal;
