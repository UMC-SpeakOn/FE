import { useState } from 'react';

import PencilImg from '@/assets/images/icons/pencil.svg';
import ProfileImg from '@/assets/images/icons/profile.svg';
import type { UserApi } from '@/types/api/account.type';
import { formatDate } from '@/utils/date';

import { useEditProfile } from '../../hooks/useEditProfile';
import EditModal from '../Modal/EditModal';

interface UserProps {
  user: UserApi;
  profileUpdated: () => void;
}

const User = ({ user, profileUpdated }: UserProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { editProfile } = useEditProfile();

  const handleEditSubmit = async ({
    name,
    image,
  }: {
    name: string;
    image?: File;
  }) => {
    await editProfile({
      nickname: name,
      profileImage: image,
    });

    alert('프로필이 수정되었습니다.');

    await profileUpdated();
    setIsEditOpen(false);
  };

  return (
    <>
      <section className="flex flex-col gap-[1.323rem]">
        <header>
          <h1 className="font-bold text-black leading-none text-[clamp(1.8rem,4.5vw,2.4rem)]">
            Hi, {user.nickname}!
          </h1>
        </header>

        <article className="w-full px-[clamp(1.6rem,4vw,2.2rem)] py-[clamp(2rem,4.5vw,2.6rem)] border-[0.1rem] border-gray-100 rounded-[1rem]">
          <div className="flex gap-[clamp(2rem,6vw,4.9rem)] items-center">
            <figure className="flex flex-col gap-[1.4rem] items-center">
              <img
                src={user.profileImgUrl || ProfileImg}
                alt={`${user.nickname} 프로필 이미지`}
                onError={(e) => {
                  e.currentTarget.src = ProfileImg;
                }}
                className="w-[clamp(8rem,22vw,10rem)] h-[clamp(8rem,22vw,10rem)] rounded-full object-cover"
              />

              <figcaption>
                <button
                  type="button"
                  className="flex items-center gap-[clamp(0.5rem,1.8vw,0.7rem)]"
                  onClick={() => setIsEditOpen(true)}
                >
                  <img src={PencilImg} alt="" className="w-[1.2rem]" />
                  <span className="font-medium text-gray-300 leading-none text-[clamp(1.1rem,3vw,1.2rem)]">
                    프로필 수정
                  </span>
                </button>
              </figcaption>
            </figure>

            <section className="flex flex-col gap-[2.5rem]">
              <div>
                <h2 className="font-bold leading-none text-black text-[clamp(1.3rem,3.5vw,1.5rem)]">
                  서비스 가입일
                </h2>

                <p className="mt-4 font-medium leading-none text-gray-600 text-[clamp(1.2rem,3.2vw,1.3rem)]">
                  {formatDate(user.createdAt)}
                </p>
              </div>

              <div>
                <h2 className="font-bold text-[clamp(1.3rem,3.5vw,1.5rem)] leading-none text-black">
                  로그인 정보
                </h2>
                <address className="mt-4 not-italic font-medium leading-[1.3] text-gray-600 text-[clamp(1.2rem,3.2vw,1.3rem)]">
                  {user.socialType} 계정으로 로그인됨
                  <br />
                  {user.email}
                </address>
              </div>
            </section>
          </div>
        </article>
      </section>

      {isEditOpen && (
        <EditModal
          defaultName={user.nickname}
          defaultImage={user.profileImgUrl ?? undefined}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </>
  );
};

export default User;
