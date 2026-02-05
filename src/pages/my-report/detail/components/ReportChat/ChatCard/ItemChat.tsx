import clsx from 'clsx';

import type { ChatLog } from '../../../types/myreport.type';

interface ItemChatProps {
  chat: ChatLog;
}

const ItemChat = ({ chat }: ItemChatProps) => {
  const isAI = chat.role.toUpperCase() === 'AI';

  return (
    <div className="w-full flex">
      <div
        className={clsx(
          'flex gap-[1.2rem] items-start w-full',
          isAI ? 'mr-auto' : 'ml-auto flex-row-reverse',
        )}
      >
        {isAI && (
          <img
            src={chat.avatarUrl}
            alt={chat.speakerName}
            className="w-16 h-16 rounded-full border-[0.1rem] border-gray-100"
          />
        )}

        <div
          className={clsx(
            'max-w-[70%] px-[1.4rem] py-[0.9rem] rounded-2xl text-[1.4rem] font-medium leading-[1.49] text-black',
            isAI ? 'bg-purple-50' : 'bg-gray-50',
          )}
        >
          {chat.message}
        </div>
      </div>
    </div>
  );
};

export default ItemChat;
