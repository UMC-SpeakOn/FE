import { useMemo, useRef } from 'react';

interface ReviewCardProps {
  text: string;
  onChange: (v: string) => void;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
}

const ReviewCard = ({
  text,
  onChange,
  maxLength = 120,
  placeholder = '작성하세요',
  disabled = false,
}: ReviewCardProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const countText = useMemo(
    () => `${Math.min(text.length, maxLength)}/${maxLength}`,
    [text, maxLength],
  );

  const handleChange = (v: string) => {
    const next = v.slice(0, maxLength);
    onChange(next);

    requestAnimationFrame(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    });
  };

  return (
    <div className="w-full rounded-2xl border-[0.1rem] border-gray-100 bg-gray-50 py-[1.2rem] px-[1.3rem]">
      <div className="flex flex-col gap-[1.4rem]">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full resize-none overflow-hidden bg-transparent outline-none text-[1.4rem] leading-[1.49] text-black placeholder:text-gray-300"
        />

        <div className="w-full flex justify-end">
          <p className="text-[1.4rem] leading-[1.49] text-gray-300">
            {countText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
