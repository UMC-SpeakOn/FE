/**
 * NotificationOverlay - 알림 오버레이 컴포넌트
 *
 * @description
 * 마무리 플로우 Step 1에서 사용되는 알림 오버레이입니다.
 * "AI의 마무리 멘트가 한 턴 추가됩니다." 메시지를 표시합니다.
 */
const NotificationOverlay = () => {
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-6 z-30">
      <p className="text-white text-2xl font-bold text-center">
        AI의 마무리 멘트가 한 턴 추가됩니다.
      </p>
    </div>
  );
};

export default NotificationOverlay;
