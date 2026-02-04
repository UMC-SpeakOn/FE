import { useMemo } from 'react';

import { useApi } from '@/hooks/useApi';
import type { AvatarItem } from '@/types/api/myrole.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useAvatar = () => {
  const axiosConfig = useMemo(
    () => ({
      method: 'GET',
      url: '/avatar/list',
    }),
    [],
  );

  const { data, isLoading, isError } = useApi<ServerApiResponse<AvatarItem[]>>(
    axiosConfig,
    { enabled: true },
  );

  return {
    avatars: data?.result ?? [],
    isLoading,
    isError,
  };
};
