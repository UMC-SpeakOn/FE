import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useWebcam 훅의 반환 타입
 */
interface UseWebcamReturn {
  /** 비디오 엘리먼트 참조 */
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** MediaStream 객체 (웹캠 스트림) */
  stream: MediaStream | null;
  /** 에러 메시지 (권한 거부, 기기 없음 등) */
  error: string | null;
  /** 로딩 상태 (카메라 시작 중) */
  isLoading: boolean;
  /** 웹캠 시작 함수 */
  startWebcam: () => Promise<void>;
  /** 웹캠 중지 함수 */
  stopWebcam: () => void;
}

/**
 * useWebcam - 웹캠 스트림 관리 커스텀 훅
 *
 * @description
 * MediaStream API를 사용하여 사용자의 웹캠 및 마이크 스트림을 관리하는 훅입니다.
 * 카메라 권한 요청, 스트림 시작/중지, 에러 핸들링을 제공합니다.
 *
 * @features
 * - getUserMedia API를 통한 웹캠 접근
 * - 카메라 권한 요청 및 에러 핸들링
 * - 1280x720 해상도, 전면 카메라 우선
 * - 오디오 스트림 포함
 * - 컴포넌트 언마운트 시 자동 정리
 * - 브라우저 autoplay 정책 대응 (명시적 play 호출)
 *
 * @permissions
 * - 카메라 권한 필요 (브라우저 팝업)
 * - 마이크 권한 필요 (음성 녹음)
 * - HTTPS 환경 필수
 *
 * @example
 * ```tsx
 * const { videoRef, error, isLoading, startWebcam, stopWebcam } = useWebcam();
 *
 * useEffect(() => {
 *   startWebcam();
 *   return () => stopWebcam();
 * }, []);
 *
 * return <video ref={videoRef} autoPlay muted />;
 * ```
 *
 * @returns {UseWebcamReturn} 웹캠 제어 객체
 *
 * @related
 * - components/VideoSection/UserVideoStream.tsx
 * - docs/issue14-implementation-solution.md (Phase 2)
 */
export const useWebcam = (): UseWebcamReturn => {
  // 비디오 엘리먼트 참조
  const videoRef = useRef<HTMLVideoElement>(null);

  // 웹캠 스트림 상태
  const [stream, setStream] = useState<MediaStream | null>(null);

  // 에러 메시지 상태
  const [error, setError] = useState<string | null>(null);

  // 로딩 상태 (권한 요청 중)
  const [isLoading, setIsLoading] = useState(false);

  /**
   * 웹캠 시작 함수
   * - getUserMedia API 호출
   * - 카메라 권한 요청
   * - 스트림을 video 엘리먼트에 연결
   * - 브라우저 autoplay 정책 대응
   */
  const startWebcam = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[useWebcam] Starting webcam...');

      // MediaStream API: 카메라 + 마이크 스트림 요청
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: true,
      });

      console.log('[useWebcam] MediaStream obtained:', {
        videoTracks: mediaStream.getVideoTracks().length,
        audioTracks: mediaStream.getAudioTracks().length,
        active: mediaStream.active,
      });

      setStream(mediaStream);

      // video 엘리먼트에 스트림 연결
      if (videoRef.current) {
        const videoElement = videoRef.current;
        console.log('[useWebcam] Setting srcObject to video element');
        videoElement.srcObject = mediaStream;

        // 메타데이터 로드 대기 (타임아웃 포함)
        console.log('[useWebcam] Waiting for metadata, readyState:', videoElement.readyState);
        await new Promise<void>((resolve) => {
          if (videoElement.readyState >= 1) {
            // 이미 메타데이터가 로드된 경우
            console.log('[useWebcam] Metadata already loaded');
            resolve();
          } else {
            videoElement.onloadedmetadata = () => {
              console.log('[useWebcam] Metadata loaded via event');
              resolve();
            };
            // 3초 타임아웃
            setTimeout(() => {
              console.log('[useWebcam] Metadata timeout after 3s');
              resolve();
            }, 3000);
          }
        });

        console.log('[useWebcam] Attempting to play video, readyState:', videoElement.readyState);

        // 브라우저 autoplay 정책/재생 타이밍 문제 해결
        try {
          await videoElement.play();
          console.log('[useWebcam] Video playing successfully');
        } catch (playError) {
          console.warn('[useWebcam] Video play failed:', playError);
          // 재시도
          setTimeout(async () => {
            try {
              await videoElement.play();
              console.log('[useWebcam] Video play retry successful');
            } catch (retryError) {
              console.error('[useWebcam] Video play retry failed:', retryError);
            }
          }, 100);
        }
      }
    } catch (err) {
      // 에러 타입별 사용자 친화적 메시지 생성
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('카메라 권한이 거부되었습니다.');
        } else if (err.name === 'NotFoundError') {
          setError('카메라를 찾을 수 없습니다.');
        } else if (err.name === 'NotReadableError') {
          setError('카메라가 이미 사용 중입니다.');
        } else {
          setError('카메라를 시작할 수 없습니다.');
        }
      }
      console.error('Webcam error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * 웹캠 중지 함수
   * - 모든 트랙(비디오, 오디오) 중지
   * - 스트림 정리
   * - video 엘리먼트 연결 해제
   */
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // 컴포넌트 언마운트 시 웹캠 자동 정리
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return {
    videoRef,
    stream,
    error,
    isLoading,
    startWebcam,
    stopWebcam,
  };
};
