import clsx from 'clsx';

import type { ChatLog } from '../../../types/myreport.type';

interface ItemChatProps {
  chat: ChatLog;
}

const ItemChat = ({ chat }: ItemChatProps) => {
  const isAI = chat.role.toUpperCase() === 'AI';

  return (
    <div
      className={clsx('w-full flex', isAI ? 'justify-start' : 'justify-end')}
    >
      <div
        className={clsx(
          'inline-flex gap-[1.2rem] items-start max-w-[75%]',
          !isAI && 'flex-row-reverse',
        )}
      >
        {isAI && (
          <img
            src={chat.avatarUrl}
            alt={chat.speakerName}
            className="w-16 h-16 rounded-full border-[0.1rem] border-gray-100 shrink-0"
          />
        )}

        <div
          className={clsx(
            'px-[1.4rem] py-[0.9rem] rounded-2xl text-[1.4rem] font-medium leading-[1.49] text-black',
            isAI ? 'bg-purple-50 text-left' : 'bg-gray-50 text-left',
          )}
        >
          {chat.message}
        </div>
      </div>
    </div>
  );
};

export default ItemChat;
