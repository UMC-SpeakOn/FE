import RoleProfileList from '@/components/RoleProfile/ListRoleProfile';
import Title from '@/components/Title/Title';
import favsData from '@/mocks/favsData';

import NotFavs from './NotFavs';

const Favs = () => {
  const hasFavs = favsData.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <Title
        title="즐겨찾기"
        description="여러 개의 역할을 저장해두고 골라서 연습할 수 있어요"
      />

      {hasFavs ? (
        <RoleProfileList
          data={favsData}
          onDelete={(id) => {
            console.log('삭제:', id);
          }}
        />
      ) : (
        <NotFavs />
      )}
    </div>
  );
};

export default Favs;
