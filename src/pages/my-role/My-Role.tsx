import { useState } from 'react';

import SuccessModal from '@/components/Modal/SuccessModal';
import { useRoleProfile } from '@/hooks/role-profile/useRoleProfile';
import { useDeleteRoleProfile } from '@/pages/my-role/hooks/useDeleteRoleProfile';

import Add from './components/Add/Add';
import Bar from './components/Bar/Bar';
import Favs from './components/Favs/Favs';

const MyRole = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const { profiles: serverProfiles, refetch } = useRoleProfile();
  const { mutate: deleteRole } = useDeleteRoleProfile();

  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const handleAddSuccess = async () => {
    await refetch();
    setIsAddModalOpen(true);
    setResetKey((k) => k + 1);
  };

  const handleDelete = async (id: number) => {
    setDeletingIds((ids) => [...ids, id]);

    try {
      const result = await deleteRole(id);
      if (!result?.isSuccess) throw new Error();

      alert('롤이 삭제되었습니다.');
      setResetKey((k) => k + 1);
    } catch {
      setDeletingIds((ids) => ids.filter((v) => v !== id));
      alert('삭제에 실패했습니다.');
    }
  };

  const visibleProfiles = serverProfiles.filter(
    (p) => !deletingIds.includes(p.id),
  );

  return (
    <div className="white-pageContainer">
      <Favs profiles={visibleProfiles} onDelete={handleDelete} />

      <Bar />
      <Add onSuccess={handleAddSuccess} key={resetKey} />

      <SuccessModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="등록 완료"
        descriptions={['메뉴 → My Speak으로', '이동해서 학습을 시작하세요!']}
      />
    </div>
  );
};

export default MyRole;
