import Spinner from '@/components/Spinner/Spinner';
import type { ChatLog } from '@/pages/my-report/detail/types/myreport.type';

import ItemChat from './ItemChat';
import LockedOverlay from './LockedOverlay';

interface ChatCardProps {
  data: ChatLog[];
  isLocked: boolean;
  isLoading: boolean;
}

const ChatCard = ({ data, isLocked, isLoading }: ChatCardProps) => {
  return (
    <div className="relative w-full h-[49rem] rounded-2xl border border-gray-100 bg-white overflow-hidden [overflow-anchor:none] will-change-transform translate-z-0">
      <div className="h-full overflow-y-auto flex flex-col gap-8 px-[1.25rem] py-[1.492rem]">
        {data.map((chat) => (
          <ItemChat key={chat.id} chat={chat} />
        ))}
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white">
          <Spinner color="var(--color-purple-700)" />
        </div>
      )}

      {isLocked && !isLoading && (
        <div className="absolute inset-0 z-10 backdrop-blur-[2px] bg-black/30">
          <LockedOverlay />
        </div>
      )}
    </div>
  );
};

export default ChatCard;
