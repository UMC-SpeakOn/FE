import { useEffect } from 'react';

import Spinner from '@/components/Spinner/Spinner';

import { useWebcam } from '../../hooks/useWebcam';

interface UserVideoStreamProps {
  position: 'main' | 'pip';
  forceStop?: boolean;
}

/**
 * UserVideoStream - 사용자 웹캠 스트림 컴포넌트
 *
 * @description
 * 사용자의 웹캠을 실시간으로 캡처하여 화면에 표시하는 컴포넌트입니다.
 * position에 따라 전체 화면(main) 또는 작은 PIP(pip)로 표시됩니다.
 *
 * @features
 * - 자동 웹캠 시작 (컴포넌트 마운트 시)
 * - 카메라 권한 요청 및 에러 핸들링
 * - 로딩 상태 표시 (Spinner)
 * - 에러 상태 UI (다시 시도 버튼 포함)
 * - position='main': 전체 화면 표시
 * - position='pip': 좌상단 작은 화면 표시
 * - 스왑 애니메이션 지원
 * - GPU 가속 렌더링 최적화 (Issue #26)
 *
 * @permissions
 * - 웹캠 권한 필요 (navigator.mediaDevices.getUserMedia)
 * - HTTPS 환경 필수 (보안 정책)
 *
 * @related
 * - hooks/useWebcam.ts - 웹캠 스트림 관리 커스텀 훅
 * - Issue #26: 배포 환경 웹캠 이슈 해결
 */
const UserVideoStream = ({ position, forceStop }: UserVideoStreamProps) => {
  const isPIP = position === 'pip';
  const { videoRef, error, isLoading, startWebcam, stopWebcam } = useWebcam();

  // 컴포넌트 마운트 시 자동으로 웹캠 시작
  useEffect(() => {
    startWebcam();
  }, [startWebcam]);

  // forceStop이 true일 때 웹캠 강제 종료 (결과 로딩 시)
  useEffect(() => {
    if (forceStop) {
      console.log('[UserVideoStream] Force stopping webcam for result loading');
      stopWebcam();
    }
  }, [forceStop, stopWebcam]);

  // 에러 상태: 카메라 권한 거부, 기기 없음 등
  if (error) {
    return (
      <div
        className={`
          bg-gray-900 flex items-center justify-center
          rounded-2xl overflow-hidden shadow-lg 
          transition-all duration-500 ease-in-out
          ${isPIP
            ? 'absolute w-45 h-60 z-[5]'
            : 'absolute inset-0 w-full h-full z-[2]'
          }
        `}
      >
        <div className="text-center text-white px-6">
          {/* 에러 아이콘 */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* 에러 메시지 */}
          <p className="text-xl font-medium text-white text-center mb-3">{error}</p>

          {/* 다시 시도 버튼 */}
          <button
            onClick={startWebcam}
            className="w-30 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white text-sm"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 로딩 상태: 카메라 권한 요청 중
  if (isLoading) {
    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {isPIP ? (
          // PIP 모드: 작은 스피너만
          <Spinner size={40} color="var(--color-purple-400)" />
        ) : (
          // Main 모드: 스피너 + 텍스트
          <div className="flex flex-col items-center">
            <Spinner size={60} color="var(--color-purple-400)" />
            <p className="mt-4 text-gray-300 text-sm">카메라 연결 중...</p>
          </div>
        )}
      </div>
    );
  }

  // 정상 상태: 웹캠 스트림 렌더링
  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        transform: 'scaleX(-1) translateZ(0)',
        backgroundColor: '#000',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        WebkitTransform: 'scaleX(-1) translateZ(0)',
      }}
      onLoadedMetadata={(e) => {
        console.log('[UserVideoStream] Video metadata loaded', {
          videoWidth: e.currentTarget.videoWidth,
          videoHeight: e.currentTarget.videoHeight,
          readyState: e.currentTarget.readyState,
          srcObject: e.currentTarget.srcObject,
        });
      }}
      onPlay={() => console.log('[UserVideoStream] Video playing')}
      onError={(e) => console.error('[UserVideoStream] Video error:', e)}
      onCanPlay={() => console.log('[UserVideoStream] Video can play')}
      onLoadStart={() => console.log('[UserVideoStream] Video load start')}
    />
  );
};

export default UserVideoStream;
