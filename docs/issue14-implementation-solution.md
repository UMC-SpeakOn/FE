# Issue #14 구현 솔루션: 면접 실전 연습 페이지 (My Speak)

## 📋 개요

Figma 디자인 `200 PWA_My Speak` 프레임을 기반으로 실시간 면접 연습 기능을 구현합니다.

**Figma 링크**: https://www.figma.com/design/3t04DssmNAHZpatkVwWLKu/Speak-On-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?node-id=440-4396&m=dev

## 🏗️ 아키텍처 및 디렉토리 구조

```
src/pages/my-speak/
├── interview/                    # 새로 생성할 면접 실전 페이지
│   ├── InterviewPage.tsx        # 메인 페이지 컴포넌트
│   ├── components/
│   │   ├── VideoSection/
│   │   │   ├── UserVideoStream.tsx      # 사용자 웹캠 영상
│   │   │   ├── InterviewerVideoPIP.tsx  # 면접관 AI 영상 (PIP)
│   │   │   └── SubtitleOverlay.tsx      # 자막 오버레이
│   │   ├── Header/
│   │   │   ├── InterviewHeader.tsx      # 상단 헤더
│   │   │   └── Timer.tsx                # 타이머 컴포넌트
│   │   ├── Controls/
│   │   │   ├── SpeakButton.tsx          # 말하기 버튼
│   │   │   ├── ControlBar.tsx           # 하단 컨트롤 바
│   │   │   └── ChatButton.tsx           # 채팅 버튼
│   │   └── Modals/
│   │       ├── PauseModal.tsx           # 일시정지 모달
│   │       └── FinishModal.tsx          # 면접 종료 모달
│   └── hooks/
│       ├── useWebcam.ts                 # 웹캠 스트림 관리
│       ├── useInterviewTimer.ts         # 타이머 로직
│       ├── useSpeechRecognition.ts      # 음성 인식 (자막)
│       └── useInterviewState.ts         # 면접 상태 관리
```

## 🎨 UI/UX 구성 요소

### 1. 레이아웃 구조

```
┌─────────────────────────────────────┐
│  Header (Timer, Status)             │
├─────────────────────────────────────┤
│                                     │
│     Main Video (User Webcam)        │
│                                     │
│                                     │
│                  ┌───────────────┐  │
│                  │  Interviewer  │  │
│                  │  Video (PIP)  │  │
│                  └───────────────┘  │
│                                     │
│  [Subtitle Overlay]                 │
│                                     │
├─────────────────────────────────────┤
│  [Speak Button / Control Bar]       │
└─────────────────────────────────────┘
```

### 2. 주요 컴포넌트 스펙

#### Header
- 진행 시간 또는 남은 시간 표시
- 현재 질문 번호 / 전체 질문 수
- 면접 상태 표시 (진행 중, 일시정지 등)

#### Video Section
- **User Video (Main)**
  - 전체 화면 배경
  - 웹캠 스트림 실시간 렌더링
  - 카메라 미지원 시 대체 UI

- **Interviewer Video (PIP)**
  - 우측 하단 고정 배치
  - Draggable 가능 (선택적)
  - 크기: 약 120x160px (모바일 기준)
  - AI 면접관 영상 또는 정적 이미지

- **Subtitle Overlay**
  - 하단 중앙 배치
  - 반투명 배경 (backdrop-blur)
  - 실시간 음성 인식 결과 표시
  - CC 버튼으로 토글 가능

#### Control Bar
- **말하기 버튼** (중앙 대형 버튼)
  - 기본 상태: "말하기 시작"
  - 말하는 중: "말하기 중..." (애니메이션)
  - 완료 상태: "다음 질문"

- **하단 컨트롤**
  - 마무리 버튼: 면접 종료
  - 일시정지/재개 버튼
  - 채팅 버튼: 면접관과 텍스트 채팅

## 🔧 기술 스택 및 라이브러리

### 핵심 기술
1. **WebRTC / MediaStream API**
   - 사용자 웹캠 스트림 캡처
   - `navigator.mediaDevices.getUserMedia()`

2. **Web Speech API**
   - 실시간 음성 인식 (자막 생성)
   - `SpeechRecognition` / `webkitSpeechRecognition`

3. **React State Management**
   - 면접 진행 상태: Zustand 또는 Context API
   - 타이머, 음성 인식, 비디오 상태 관리

### 추천 라이브러리
```json
{
  "dependencies": {
    "react-webcam": "^7.2.0",           // 웹캠 컴포넌트
    "zustand": "^4.5.0",                 // 상태 관리
    "react-timer-hook": "^3.0.7",        // 타이머 훅
    "react-draggable": "^4.4.6"          // PIP 드래그 (선택)
  }
}
```

## 📝 구현 단계

### Phase 1: 기본 레이아웃 및 라우팅
- [ ] `/my-speak/interview` 라우트 추가
- [ ] `InterviewPage.tsx` 기본 구조 작성
- [ ] `.pageContainer` 및 모바일 레이아웃 적용
- [ ] Header, Footer, Video Section 배치

### Phase 2: 웹캠 및 비디오 스트림
- [ ] `useWebcam` 훅 구현
  - 카메라 권한 요청
  - 스트림 시작/중지
  - 에러 핸들링 (권한 거부, 카메라 없음)
- [ ] `UserVideoStream` 컴포넌트 구현
- [ ] `InterviewerVideoPIP` 컴포넌트 구현
  - 정적 이미지 또는 비디오 재생
  - PIP 위치 조정

### Phase 3: 타이머 기능
- [ ] `useInterviewTimer` 훅 구현
  - 시작/일시정지/재개/종료
  - 경과 시간 또는 남은 시간 표시
- [ ] `Timer` 컴포넌트 UI 구현

### Phase 4: 말하기 버튼 및 상태 관리
- [ ] `useInterviewState` 훅 구현
  - 면접 진행 상태: READY, SPEAKING, PAUSED, FINISHED
  - 현재 질문 인덱스 관리
- [ ] `SpeakButton` 컴포넌트 구현
  - 상태별 버튼 UI 변경
  - 클릭 이벤트 핸들링

### Phase 5: 자막 (CC) 기능
- [ ] `useSpeechRecognition` 훅 구현
  - Web Speech API 초기화
  - 실시간 음성 → 텍스트 변환
  - 자막 토글 상태 관리
- [ ] `SubtitleOverlay` 컴포넌트 구현
  - 자막 표시/숨김
  - 반투명 배경 스타일

### Phase 6: 하단 컨트롤 바
- [ ] `ControlBar` 컴포넌트 구현
  - 마무리, 일시정지, 채팅 버튼
- [ ] 모달 구현
  - `PauseModal`: 일시정지 상태 안내
  - `FinishModal`: 면접 종료 확인

### Phase 7: 통합 및 테스트
- [ ] 전체 플로우 테스트
  - 면접 시작 → 말하기 → 일시정지 → 재개 → 종료
- [ ] 에러 상황 처리
  - 카메라 권한 거부
  - 음성 인식 지원 안 됨
  - 네트워크 오류
- [ ] 모바일 반응형 확인
- [ ] 성능 최적화 (불필요한 리렌더링 방지)

## 🎯 핵심 구현 코드 예시

### 1. useWebcam Hook

```typescript
// src/pages/my-speak/interview/hooks/useWebcam.ts
import { useEffect, useRef, useState } from 'react';

export const useWebcam = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startWebcam = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: true,
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.name === 'NotAllowedError'
          ? '카메라 권한이 거부되었습니다.'
          : '카메라를 시작할 수 없습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

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
```

### 2. useInterviewTimer Hook

```typescript
// src/pages/my-speak/interview/hooks/useInterviewTimer.ts
import { useEffect, useState } from 'react';

export const useInterviewTimer = (initialSeconds = 0) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    seconds,
    isRunning,
    formattedTime: formatTime(seconds),
    start,
    pause,
    reset,
  };
};
```

### 3. UserVideoStream Component

```typescript
// src/pages/my-speak/interview/components/VideoSection/UserVideoStream.tsx
import { useWebcam } from '../../hooks/useWebcam';

export const UserVideoStream = () => {
  const { videoRef, error, isLoading, startWebcam } = useWebcam();

  useEffect(() => {
    startWebcam();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <p className="text-lg font-medium">{error}</p>
          <button
            onClick={startWebcam}
            className="mt-4 px-6 py-2 bg-purple-600 rounded-lg"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900">
        <Spinner />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="w-full h-full object-cover"
    />
  );
};
```

### 4. InterviewPage Layout

```typescript
// src/pages/my-speak/interview/InterviewPage.tsx
import { useState } from 'react';
import { UserVideoStream } from './components/VideoSection/UserVideoStream';
import { InterviewerVideoPIP } from './components/VideoSection/InterviewerVideoPIP';
import { SubtitleOverlay } from './components/VideoSection/SubtitleOverlay';
import { InterviewHeader } from './components/Header/InterviewHeader';
import { Timer } from './components/Header/Timer';
import { SpeakButton } from './components/Controls/SpeakButton';
import { ControlBar } from './components/Controls/ControlBar';
import { useInterviewTimer } from './hooks/useInterviewTimer';

export const InterviewPage = () => {
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timer = useInterviewTimer();

  return (
    <div className="pageContainer relative h-screen overflow-hidden">
      {/* Header */}
      <InterviewHeader>
        <Timer time={timer.formattedTime} />
      </InterviewHeader>

      {/* Main Video Section */}
      <div className="relative w-full h-full">
        <UserVideoStream />

        {/* PIP Interviewer Video */}
        <div className="absolute bottom-24 right-4">
          <InterviewerVideoPIP />
        </div>

        {/* Subtitle Overlay */}
        {showSubtitles && (
          <div className="absolute bottom-32 left-0 right-0">
            <SubtitleOverlay />
          </div>
        )}
      </div>

      {/* Speak Button */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <SpeakButton />
      </div>

      {/* Control Bar */}
      <ControlBar
        onToggleSubtitles={() => setShowSubtitles(!showSubtitles)}
        onPause={() => {
          setIsPaused(true);
          timer.pause();
        }}
        onFinish={() => {
          // Navigate to results page
        }}
      />
    </div>
  );
};
```

## 🎨 Tailwind 스타일 가이드

### 주요 색상 (프로젝트 테마 활용)
```css
/* Purple palette */
- 버튼 primary: bg-purple-600, hover:bg-purple-700
- 배경: bg-purple-900
- 텍스트: text-purple-100

/* Green accent */
- 말하기 활성화: bg-green-500 (#cfff5e)

/* Neutral */
- 비디오 배경: bg-gray-900
- 텍스트: text-white, text-gray-300
```

### 반응형 레이아웃
```typescript
// 모바일 최적화 (max-width: 430px)
<div className="max-w-[430px] mx-auto">

// PIP 비디오
<div className="w-[120px] h-[160px] rounded-lg overflow-hidden shadow-lg">

// 자막 오버레이
<div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg">

// 말하기 버튼
<button className="w-20 h-20 rounded-full bg-green-500 shadow-modal">
```

## 🔐 권한 및 에러 핸들링

### 1. 카메라 권한 요청
```typescript
// 최초 진입 시 권한 안내 모달 표시
// 권한 거부 시 대체 UI 제공 (프로필 이미지 또는 안내 메시지)
```

### 2. 음성 인식 브라우저 지원 체크
```typescript
const isSpeechRecognitionSupported =
  'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

if (!isSpeechRecognitionSupported) {
  // 자막 기능 비활성화 안내
}
```

### 3. 네트워크 오류 처리
```typescript
// AI 면접관 영상 로딩 실패 시 정적 이미지로 대체
// 타임아웃 처리 및 재시도 로직
```

## 🧪 테스트 체크리스트

- [ ] 카메라 권한 허용 시 정상 작동
- [ ] 카메라 권한 거부 시 대체 UI 표시
- [ ] 타이머 시작/일시정지/재개 정상 작동
- [ ] 말하기 버튼 상태 전환 (시작 → 중 → 완료)
- [ ] 자막 실시간 표시 및 토글 기능
- [ ] PIP 비디오 정상 렌더링
- [ ] 하단 컨트롤 버튼 모두 작동
- [ ] 일시정지 모달 표시 및 재개
- [ ] 면접 종료 모달 및 결과 페이지 이동
- [ ] 모바일 (430px) 반응형 정상 표시
- [ ] 페이지 이탈 시 카메라 스트림 정리

## 📦 배포 전 확인사항

1. **환경 변수 설정**
   - AI 면접관 비디오 URL (있는 경우)
   - 음성 인식 API 키 (외부 서비스 사용 시)

2. **PWA 설정**
   - 카메라 권한이 PWA에서 정상 작동하는지 확인
   - HTTPS 환경에서만 작동 (MediaStream API 요구사항)

3. **성능 최적화**
   - 비디오 스트림 해상도 최적화
   - 불필요한 리렌더링 방지 (React.memo, useMemo)
   - 타이머 성능 최적화 (requestAnimationFrame 고려)

## 🔗 참고 자료

- [MDN: MediaStream API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_API)
- [MDN: Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [React Webcam Library](https://www.npmjs.com/package/react-webcam)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)

---

**작성일**: 2026-01-19
**이슈**: [#14](https://github.com/UMC-SpeakOn/FE/issues/14)
**Figma**: [200 PWA_My Speak](https://www.figma.com/design/3t04DssmNAHZpatkVwWLKu/Speak-On-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?node-id=440-4396&m=dev)
