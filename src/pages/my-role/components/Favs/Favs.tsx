import RoleProfileList from '@/components/RoleProfile/ListRoleProfile';
import Title from '@/components/Title/Title';
import { useDeleteRoleProfile } from '@/hooks/role/useDeleteRoleProfile';
import { useRoleProfile } from '@/hooks/role/useRoleProfile';

import NotFavs from './NotFavs';

const Favs = () => {
  const { profiles, refetch } = useRoleProfile();
  const { mutate: deleteRole } = useDeleteRoleProfile();

  const handleDelete = async (id: number) => {
    const result = await deleteRole(id);

    if (!result) return;

    if (result.isSuccess) {
      alert('롤이 삭제되었습니다.');
      refetch();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <Title
        title="즐겨찾기"
        description="여러 개의 역할을 저장해두고 골라서 연습할 수 있어요"
      />

      {profiles.length > 0 ? (
        <RoleProfileList data={profiles} onDelete={handleDelete} />
      ) : (
        <NotFavs />
      )}
    </div>
  );
};

export default Favs;
