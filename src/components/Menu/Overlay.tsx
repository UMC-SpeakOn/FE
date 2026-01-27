import { useMenu } from "@/contexts/MenuContext";

const Overlay = () => {
  const { isMenuOpen, closeMenu } = useMenu();

  if (!isMenuOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-black bg-opacity-50"
      onClick={closeMenu}
      aria-label="메뉴 닫기"
    />
  );
};

export default Overlay;
