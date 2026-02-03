import { useEffect, useState } from "react";

import LeftArrowIcon from "@/assets/images/icons/left-arrow.svg";
import NavPurpleIcon from "@/assets/images/icons/nav-purple.svg";
import { useMenu } from "@/contexts/MenuContext";
import useNavigation from "@/hooks/useNavigation";

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  path?: string;
  iconPosition: "left" | "right" | "none";
  subItems?: SubMenuItem[];
}

const MENU_ITEMS: MenuItem[] = [
  { id: "my-role", label: "My Role", path: "/my-role", iconPosition: "left" },
  {
    id: "my-speak",
    label: "My Speak",
    path: "/my-speak/setting",
    iconPosition: "right",
  },
  {
    id: "my-report",
    label: "My Report",
    path: "/my-report",
    iconPosition: "left",
  },
  {
    id: "profile",
    label: "Profile",
    iconPosition: "none",
    subItems: [
      { id: "account", label: "계정", path: "/profile/account" },
      { id: "subscription", label: "구독", path: "/profile/subscription" },
    ],
  },
];

const Menu = () => {
  const { isMenuOpen, closeMenu } = useMenu();
  const { navigateTo } = useNavigation();
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [openSubMenuId, setOpenSubMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (isMenuOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, closeMenu]);

  const handleAnimationEnd = () => {
    if (isClosing) {
      setShouldRender(false);
      setIsClosing(false);
    }
  };

  if (!shouldRender) return null;

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.subItems) {
      // 하위 메뉴가 있으면 토글
      setOpenSubMenuId(openSubMenuId === item.id ? null : item.id);
    } else if (item.path) {
      // 하위 메뉴가 없으면 바로 네비게이션
      navigateTo(item.path);
      closeMenu();
    }
  };

  const handleSubItemClick = (path: string) => {
    navigateTo(path);
    closeMenu();
  };

  return (
    <div
      className={`absolute inset-0 z-50 ${isClosing ? "animate-fadeOut" : "animate-fadeIn"
        }`}
      onAnimationEnd={handleAnimationEnd}
      role="dialog"
      aria-modal="true"
      aria-label="메뉴"
    >
      {/* 메뉴 컨테이너 */}
      <div
        className={`absolute inset-y-0 left-0 w-full h-full flex flex-col bg-purple-500 ${isClosing ? "animate-slideOutRight" : "animate-slideInRight"
          }`}
      >
        {/* 메뉴 헤더 */}
        <div className="relative flex items-center justify-between pt-10 px-10 pb-5">
          <button
            onClick={closeMenu}
            className="flex items-center justify-center disabled:opacity-50"
            aria-label="메뉴 닫기"
            disabled={isClosing}
          >
            <img src={LeftArrowIcon} alt="뒤로가기" />
          </button>
        </div>

        {/* 메뉴 아이템 */}
        <div className="flex flex-col">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="flex flex-col">
              {/* 텍스트 버튼 (클릭 가능 영역) */}
              <button
                className="relative text-left text-xl font-bold leading-[18px] text-gray-50 py-[28px] mx-6 px-8 transition-opacity before:absolute before:inset-0 before:bg-transparent hover:before:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleMenuItemClick(item)}
                disabled={isClosing}
                aria-label={
                  item.subItems
                    ? `${item.label} 하위 메뉴 ${openSubMenuId === item.id ? "닫기" : "열기"}`
                    : `${item.label} 페이지로 이동`
                }
                aria-expanded={item.subItems ? openSubMenuId === item.id : undefined}
              >
                <span className="relative z-10">{item.label}</span>
              </button>

              {/* 하위 메뉴 */}
              {item.subItems && openSubMenuId === item.id && (
                <div className="flex flex-col bg-purple-500 mx-6 overflow-hidden animate-slideDown">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      className="text-left text-lg border-t border-purple-400 text-gray-50 py-4 px-8 hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleSubItemClick(subItem.path)}
                      disabled={isClosing}
                      aria-label={`${subItem.label} 페이지로 이동`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 아이콘과 선 (시각적 구분 요소만, 클릭 불가) */}
              <div className="relative flex w-full items-center px-5 h-[1px]">
                {item.iconPosition === "left" && (
                  <>
                    <img
                      src={NavPurpleIcon}
                      alt="nav icon"
                      className="h-[1.34769rem] w-[1.28394rem]"
                    />
                    <div className=" h-[1px] flex-1 bg-purple-400" />
                  </>
                )}

                {item.iconPosition === "right" && (
                  <div className="absolute inset-x-0 flex items-center px-5">
                    <div className="h-[1px] flex-1 bg-purple-400" />
                    <img
                      src={NavPurpleIcon}
                      alt="nav icon"
                      className="h-[1.34769rem] w-[1.28394rem]"
                    />
                  </div>
                )}

                {item.iconPosition === "none" && (
                  <div className="h-[1px] w-full bg-purple-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
