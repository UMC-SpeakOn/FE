import { useEffect, useState } from "react";

import LeftArrowIcon from "@/assets/images/icons/left-arrow.svg";
import NavPurpleIcon from "@/assets/images/icons/nav-purple.svg";
import { useMenu } from "@/contexts/MenuContext";
import { useSwipe } from "@/hooks/useSwipe";

const Menu = () => {
  const { isMenuOpen, closeMenu } = useMenu();
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // 스와이프 제스처로 메뉴 닫기
  const swipeRef = useSwipe({
    onSwipeLeft: closeMenu,
    threshold: 50,
  });

  useEffect(() => {
    if (isMenuOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
    }
  }, [isMenuOpen, shouldRender]);

  const handleAnimationEnd = () => {
    if (isClosing) {
      setShouldRender(false);
      setIsClosing(false);
    }
  };

  if (!shouldRender) return null;

  // 임시 메뉴 항목 데이터
  const menuItems = [
    { id: "my-role", label: "My Role", path: "/my-role", iconPosition: "left" as const },
    { id: "my-speak", label: "My Speak", path: "/my-speak", iconPosition: "right" as const },
    { id: "my-report", label: "My Report", path: "/my-report", iconPosition: "left" as const },
    { id: "profile", label: "Profile", path: "/profile", iconPosition: "none" as const },
  ];

  return (
    <div
      className={`absolute inset-0 z-50 ${isClosing ? "animate-fadeOut" : "animate-fadeIn"
        }`}
      onAnimationEnd={handleAnimationEnd}
    >
      {/* 메뉴 컨테이너 */}
      <div
        ref={swipeRef}
        className={`absolute inset-y-0 left-0 w-full h-full flex flex-col bg-purple-500 ${isClosing ? "animate-slideOutRight" : "animate-slideInRight"
          }`}
      >
        {/* 메뉴 헤더 */}
        <div className="relative flex items-center justify-between pt-10 px-10 pb-5">
          <button
            onClick={closeMenu}
            className="flex items-center justify-center"
            aria-label="메뉴 닫기"
          >
            <img src={LeftArrowIcon} alt="뒤로가기" />
          </button>
        </div>

        {/* 메뉴 아이템 */}
        <div className="flex flex-col">
          {menuItems.map((item) => (
            <div key={item.id} className="flex flex-col  ">
              {/* 텍스트 버튼 (클릭 가능 영역) */}
              <button
                className="relative text-left text-xl font-bold leading-[18px] text-gray-50 py-[28px] mx-6 px-8 transition-opacity before:absolute before:inset-0 before:bg-transparent hover:before:bg-purple-600 "
                onClick={() => {
                  // TODO: 라우팅 기능은 Phase 4에서 구현
                  console.log(`Navigate to: ${item.path}`);
                }}
              >
                <span className="relative z-10">{item.label}</span>
              </button>

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
