import { useState } from 'react';

import ProfileModal from '@/components/Modal/ProfileModal';
import Spinner from '@/components/Spinner/Spinner';
import useNavigation from '@/hooks/useNavigation';
import { tokenManager } from '@/utils/apiClient';

import Setting from './components/Setting/Setting';
import Subscribe from './components/Subscribe/Subscribe';
import User from './components/User/User';
import { useDeleteProfile } from './hooks/useDeleteProfile';
import { useUserProfile } from './hooks/useUserProfile';

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { navigateTo } = useNavigation();

  const { user, isLoading, isError, refetch } = useUserProfile();
  const { deleteProfile, isLoading: isDeleting } = useDeleteProfile();

  const handleOpenDeleteModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDeleteAccount = async () => {
    if (isDeleting) return;

    try {
      const res = await deleteProfile();

      if (res?.result) {
        alert(res.result.message);
        tokenManager.clearTokens();
        localStorage.clear();
        navigateTo('/', { replace: true });
      }
    } catch {
      alert('회원 탈퇴에 실패했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsOpen(false);
    }
  };

  if (isLoading || isError || !user) {
    return (
      <div className="white-pageContainer flex items-center justify-center">
        <Spinner color="var(--color-purple-700)" />
      </div>
    );
  }

  return (
    <div className="white-pageContainer gap-[3.6rem] pr-[1.462rem] relative">
      <User user={user} profileUpdated={refetch} />

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
          confirmText={isDeleting ? '삭제 중...' : '삭제하기'}
          onCancel={handleCancel}
          onConfirm={handleDeleteAccount}
          onClose={handleCancel}
        />
      )}
    </div>
  );
};

export default Account;
