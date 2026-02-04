import RoleProfileList from '@/components/RoleProfile/ListRoleProfile';
import Title from '@/components/Title/Title';
import type { RoleProfileItem } from '@/types/role-profile/role-profile.type';

import NotFavs from './NotFavs';

interface FavsProps {
  profiles: RoleProfileItem[];
  onDelete: (id: number) => void;
}

const Favs = ({ profiles, onDelete }: FavsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Title
        title="즐겨찾기"
        description="여러 개의 역할을 저장해두고 골라서 연습할 수 있어요"
      />

      {profiles.length > 0 ? (
        <RoleProfileList data={profiles} onDelete={onDelete} />
      ) : (
        <NotFavs />
      )}
    </div>
  );
};

export default Favs;
