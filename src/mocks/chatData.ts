import type { ChatMessage } from "@/pages/my-speak/interview-chat/types/chat.type";

/**
 * 초기 채팅 메시지 목록
 * 면접 시작 시 표시되는 기본 대화 내용
 */
export const initialChatMessages: ChatMessage[] = [
  {
    id: "1",
    content: "안녕하세요! 오늘 면접에 참여해주셔서 감사합니다.\n간단히 자기소개 부탁드립니다.",
    type: "AI",
    timestamp: new Date("2026-01-20T10:00:00"),
  },
  {
    id: "2",
    content: "안녕하세요. 저는 프론트엔드 개발자로 3년간 일해왔습니다.",
    type: "User",
    timestamp: new Date("2026-01-20T10:00:30"),
  },
  {
    id: "3",
    content: "좋습니다. 최근에 진행한 프로젝트에 대해 설명해주시겠어요?",
    type: "AI",
    timestamp: new Date("2026-01-20T10:01:00"),
  },
];

/**
 * Mock AI 응답 템플릿
 * 사용자 메시지에 대한 랜덤 응답으로 사용
 */
export const mockAIResponses: string[] = [
  "좋은 답변이네요. 다음 질문으로 넘어가겠습니다.",
  "흥미로운 경험이시네요. 조금 더 자세히 설명해주실 수 있나요?",
  "이해했습니다. 그렇다면 어떤 기술 스택을 사용하셨나요?",
  "감사합니다. 그 프로젝트에서 가장 어려웠던 점은 무엇이었나요?",
  "네, 잘 알겠습니다. 팀에서 어떤 역할을 맡으셨나요?",
  "훌륭하네요. 그 경험을 통해 배운 점이 있다면 무엇인가요?",
  "마지막으로 궁금한 점이 있으신가요?",
];
