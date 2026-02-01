import { useState } from 'react';

import { useDeleteRoleProfile } from '@/hooks/role/useDeleteRoleProfile';
import { useRoleProfile } from '@/hooks/role/useRoleProfile';

import Add from './components/Add/Add';
import Bar from './components/Bar/Bar';
import Favs from './components/Favs/Favs';
import AddModal from './components/Modal/AddModal';

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

      <AddModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default MyRole;
