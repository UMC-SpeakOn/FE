import Title from '@/components/Title/Title';
import ChatSetting from './components/ChatSetting/ChatSetting';

const Setting = () => {
  return (
    <div className="white-pageContainer gap-[0.904rem]! pb-[10.01rem]!">
      <Title title="대화 설정" description="AI롤 · 세션 목표를 선택해주세요" />
      <ChatSetting />
    </div>
  );
};

export default Setting;
