import { useState } from 'react';

/**
 * 말하기 버튼의 3가지 상태를 정의하는 타입
 * @typedef {('ready'|'speaking'|'completed')} SpeakState
 */
type SpeakState = 'ready' | 'speaking' | 'completed';

/**
 * SpeakButton - 말하기 컨트롤 버튼
 *
 * @description
 * 사용자의 음성 입력을 제어하는 핵심 인터랙션 버튼입니다.
 * 턴 기반 대화 시스템에서 사용자의 발화 시작/종료를 관리합니다.
 *
 * @features
 * - 3단계 상태 전환 (ready → speaking → completed)
 * - 각 상태별 다른 색상, 아이콘, 텍스트 표시
 * - shadow-modal 효과로 강조
 * - 중앙 하단 배치
 *
 * @states
 * - ready: 말하기 준비 (녹색, 마이크 아이콘)
 * - speaking: 말하는 중 (빨강, 정지 아이콘, pulse 애니메이션)
 * - completed: 발화 완료 (보라색, 화살표 아이콘)
 *
 * @todo
 * - Phase 4에서 useInterviewState 훅 연결 예정
 * - 실제 음성 녹음 시작/종료 로직 통합
 * - AI 응답 대기 상태 추가
 *
 * @related
 * - docs/my-speak.md (섹션 6-1. 턴 단위 대화)
 * - hooks/useInterviewState.ts (Phase 4에서 구현)
 */
const SpeakButton = () => {
  // TODO: Phase 4에서 useInterviewState 훅으로 교체
  const [state, setState] = useState<SpeakState>('ready');

  /**
   * 버튼 클릭 핸들러 - 상태 전환 로직
   * ready → speaking → completed → ready (순환)
   */
  const handleClick = () => {
    if (state === 'ready') {
      // 말하기 시작
      setState('speaking');
    } else if (state === 'speaking') {
      // 말하기 중지 → 완료
      setState('completed');
    } else {
      // 다음 질문으로 (준비 상태로 복귀)
      setState('ready');
    }
  };

  /**
   * 현재 상태에 따른 버튼 UI 컨텐츠 반환
   * @returns {{ text: string, bgColor: string, icon: JSX.Element }}
   */
  const getButtonContent = () => {
    switch (state) {
      case 'ready':
        // 준비 상태: 녹색 마이크 아이콘
        return {
          text: '말하기 시작',
          bgColor: 'bg-green-500',
          icon: (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          ),
        };
      case 'speaking':
        // 말하는 중: 빨간색 정지 아이콘 + pulse 애니메이션
        return {
          text: '말하는 중...',
          bgColor: 'bg-red-500 animate-pulse',
          icon: (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 6h12v12H6z" />
            </svg>
          ),
        };
      case 'completed':
        // 완료 상태: 보라색 화살표 아이콘
        return {
          text: '다음 질문',
          bgColor: 'bg-purple-600',
          icon: (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          ),
        };
    }
  };

  const content = getButtonContent();

  return (
    <button
      onClick={handleClick}
      className={`${content.bgColor} hover:opacity-90 transition-all duration-200 rounded-full shadow-modal flex items-center gap-3 px-6 py-4`}
    >
      {/* 상태별 아이콘 */}
      {content.icon}
      {/* 상태별 텍스트 */}
      <span className="text-white font-medium">{content.text}</span>
    </button>
  );
};

export default SpeakButton;
