import { useState } from 'react';

import ProfileModal from '@/components/Modal/ProfileModal';

import Setting from './components/Setting/Setting';
import Subscribe from './components/Subscribe/Subscribe';
import User from './components/User/User';

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    console.log('계정삭제 버튼 클릭');
    setIsOpen(true);
  };

  const handleDeleteAccount = () => {
    console.log('계정 삭제 확정');
    setIsOpen(false);
  };

  const handleCancel = () => {
    console.log('계정 삭제 취소');
    setIsOpen(false);
  };

  return (
    <div className="white-pageContainer gap-[3.6rem] pr-[1.462rem]">
      <User />
      <Subscribe />

      <Setting onDeleteAccount={handleOpenDeleteModal} />

      {isOpen && (
        <ProfileModal
          title="정말 삭제하시겠어요?"
          descriptions={[
            '계정을 삭제하면 모든 대화와\n학습 내역이 삭제되며 복구할 수 없어요',
            '계정을 삭제하면 남아 있는 구독도 함께 해지돼요',
          ]}
          cancelText="취소"
          confirmText="삭제하기"
          onCancel={handleCancel}
          onConfirm={handleDeleteAccount}
          onClose={handleCancel}
        />
      )}
    </div>
  );
};

export default Account;
