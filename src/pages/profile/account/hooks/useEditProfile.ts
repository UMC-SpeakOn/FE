import { useMutation } from '@/hooks/useApi';
import type {
  EditProfileRequest,
  EditProfileResponse,
} from '@/types/api/account.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useEditProfile = () => {
  const { mutate, data, isLoading, isError, error } = useMutation<
    ServerApiResponse<EditProfileResponse>,
    EditProfileRequest
  >(({ nickname, profileImage }) => {
    const formData = new FormData();
    formData.append('nickname', nickname);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    return {
      method: 'PATCH',
      url: '/user/profile',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  });

  return {
    editProfile: mutate,
    data: data?.result ?? null,
    isLoading,
    isError,
    error,
  };
};
