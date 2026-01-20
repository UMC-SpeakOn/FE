import { useState } from "react";

import useNavigation from "@/hooks/useNavigation";
import { personsData } from "@/mocks/addData";

import AudioOverlay from "./components/AudioOverlay";
import ChatControls from "./components/ChatControls";
import ChatInput from "./components/ChatInput";
import MessageList from "./components/MessageList";
import { useChat } from "./hooks/useChat";
import type { ChatMessage } from "./types/chat.type";

/**
 * InterviewChatPage - 면접 채팅 모드 페이지
 *
 * @description
 * 영상 면접 중 텍스트 채팅 모드로 전환된 상태의 페이지입니다.
 * Mock 데이터를 사용하여 AI와의 채팅을 시뮬레이션합니다.
 *
 * @features
 * - AI/User 메시지 구분 표시
 * - 텍스트 입력 및 전송
 * - Mock AI 응답 (1초 딜레이)
 * - 소리 켜기 오버레이
 * - 카메라 모드로 전환
 *
 * @related
 * - Issue: https://github.com/UMC-SpeakOn/FE/issues/15
 * - Route: /my-speak/interview-chat
 */
const InterviewChatPage = () => {
    const { navigateTo } = useNavigation();
    const { messages, isLoading, sendMessage } = useChat();

    // 오디오 오버레이 상태
    const [audioOverlay, setAudioOverlay] = useState<{
        isOpen: boolean;
        message: ChatMessage | null;
    }>({ isOpen: false, message: null });

    // 면접관 정보 (첫 번째 면접관 사용)
    const interviewer = personsData[0];

    /**
     * 오디오 재생 핸들러
     * @param message - 재생할 메시지
     */
    const handlePlayAudio = (message: ChatMessage) => {
        setAudioOverlay({ isOpen: true, message });
    };

    /**
     * 영상 모드로 전환
     */
    const handleSwitchToVideo = () => {
        navigateTo("/my-speak/interview");
    };

    /**
     * 면접 마무리
     */
    const handleFinish = () => {
        // TODO: 결과 페이지로 이동 또는 모달 표시
        alert("면접을 마무리합니다.");
        navigateTo("/my-speak");
    };

    return (
        <div className="flex flex-col h-screen bg-purple-500">
            {/* 상단 헤더 */}
            <header className="flex flex-col items-center pt-2 pb-1.5 px-4 gap-4 my-5">
                <h1 className="text-white text-4xl font-unbounded">SpeakOn</h1>
                <p className="text-white text-xl">{interviewer.city} 면접 연습</p>
            </header>

            {/* 채팅 영역 */}
            <div className="flex-1 flex flex-col bg-white rounded-t-2xl overflow-hidden">
                <MessageList
                    messages={messages}
                    onPlayAudio={handlePlayAudio}
                />

                <ChatInput
                    onSend={sendMessage}
                    disabled={isLoading}
                />
            </div>

            {/* 하단 컨트롤 바 */}
            <ChatControls
                onSwitchToVideo={handleSwitchToVideo}
                onFinish={handleFinish}
            />

            {/* 오디오 오버레이 */}
            <AudioOverlay
                isOpen={audioOverlay.isOpen}
                onClose={() => setAudioOverlay({ isOpen: false, message: null })}
                message={audioOverlay.message?.content || ""}
            />
        </div>
    );
};

export default InterviewChatPage;
