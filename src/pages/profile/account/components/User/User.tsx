import { useState } from 'react';

import PencilImg from '@/assets/images/icons/pencil.svg';
import ProfileImg from '@/assets/images/icons/profile.svg';
import { userData } from '@/mocks/userData';

import EditModal from '../Modal/EditModal';

const User = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col gap-[1.323rem]">
        <header>
          <h1 className="font-bold text-black text-[2.4rem] leading-none">
            Hi, {userData.nickname}!
          </h1>
        </header>

        <article className="w-full py-[2.6rem] px-[2.2rem] border-[0.1rem] border-gray-100 rounded-[1rem]">
          <div className="flex gap-[4.9rem] items-center">
            <figure className="flex flex-col gap-[1.4rem] items-center">
              <img
                src={userData.profileImgUrl || ProfileImg}
                alt={`${userData.nickname} 프로필 이미지`}
                onError={(e) => {
                  e.currentTarget.src = ProfileImg;
                }}
                className="w-[10rem] h-[10rem] rounded-full object-cover"
              />

              <figcaption>
                <button
                  type="button"
                  className="flex items-center gap-[0.7rem]"
                  onClick={() => setIsEditOpen(true)}
                >
                  <img src={PencilImg} alt="" className="w-[1.2rem]" />
                  <span className="font-medium text-gray-300 text-[1.2rem] leading-none">
                    프로필 수정
                  </span>
                </button>
              </figcaption>
            </figure>

            <section className="flex flex-col gap-[2.5rem]">
              <div>
                <h2 className="font-bold text-[1.5rem] leading-none text-black">
                  서비스 가입일
                </h2>
                <p className="mt-4 font-medium text-[1.3rem] leading-none text-gray-600">
                  {userData.name}
                </p>
              </div>

              <div>
                <h2 className="font-bold text-[1.5rem] leading-none text-black">
                  로그인 정보
                </h2>
                <address className="mt-4 not-italic font-medium text-[1.3rem] leading-[1.25] text-gray-600">
                  {userData.socialType} 계정으로 로그인됨
                  <br />
                  {userData.email}
                </address>
              </div>
            </section>
          </div>
        </article>
      </section>

      {isEditOpen && (
        <EditModal
          defaultName={userData.nickname}
          defaultImage={userData.profileImgUrl}
          onClose={() => setIsEditOpen(false)}
          onSubmit={(data) => {
            console.log('프로필 수정 값', data);
            setIsEditOpen(false);
          }}
        />
      )}
    </>
  );
};

export default User;
