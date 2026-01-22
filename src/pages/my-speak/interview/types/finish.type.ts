/**
 * 마무리 플로우 단계
 * - idle: 마무리 플로우 시작 전
 * - notification: Step 1 - 알림 오버레이 (부분 화면)
 * - ai_message: Step 2 - AI 멘트 출력 (영상: TTS, 채팅: 메시지)
 * - loading: Step 3 - 로딩 스피너 (전체 화면)
 */
export type FinishStep = "idle" | "notification" | "ai_message" | "loading";
