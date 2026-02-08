import { useState } from 'react';

import ProfileModal from '@/components/Modal/ProfileModal';

import Setting from './components/Setting/Setting';
import Subscribe from './components/Subscribe/Subscribe';
import User from './components/User/User';
import { useUserProfile } from './hooks/useUserProfile';

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, isError } = useUserProfile();

  const handleOpenDeleteModal = () => {
    setIsOpen(true);
  };

  const handleDeleteAccount = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return <div className="white-pageContainer">로딩 중...</div>;
  }

  if (isError || !user) {
    return <div className="white-pageContainer">에러 발생</div>;
  }

  return (
    <div className="white-pageContainer gap-[3.6rem] pr-[1.462rem]">
      <User user={user} />
      <Subscribe user={user} />

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
