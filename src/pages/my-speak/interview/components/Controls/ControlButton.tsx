interface ControlButtonProps {
    icon: string;
    label: string;
    onClick: () => void;
    iconSize?: string;
    disabled?: boolean;
}

/**
 * ControlButton - 인터뷰 페이지 하단 컨트롤 버튼 컴포넌트
 *
 * @description
 * 면접 페이지 하단의 원형 컨트롤 버튼 (마무리하기, 일시정지, 이어서 하기, 채팅 등)
 */
const ControlButton = ({
    icon,
    label,
    onClick,
    disabled = false,
}: ControlButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex flex-col items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <div className="h-23 w-23 rounded-full bg-white flex items-center justify-center">
                <img src={icon} alt={label} />
            </div>
            <span className="text-lg text-white">{label}</span>
        </button>
    );
};

export default ControlButton;
