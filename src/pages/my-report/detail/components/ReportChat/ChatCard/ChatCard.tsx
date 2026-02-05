import type { ChatLog } from '@/pages/my-report/detail/types/myreport.type';

import ItemChat from './ItemChat';
// import LockedOverlay from './LockedOverlay';

interface ChatCardProps {
  data: ChatLog[];
}

const ChatCard = ({ data }: ChatCardProps) => {
  return (
    <div className="relative w-full rounded-2xl border-[0.1rem] border-gray-100">
      <div className="max-h-[49rem] overflow-y-auto flex flex-col gap-8 px-[1.25rem] py-[1.492rem]">
        {data.map((chat) => (
          <ItemChat key={chat.id} chat={chat} />
        ))}
      </div>

      {/* <LockedOverlay /> */}
    </div>
  );
};

export default ChatCard;
