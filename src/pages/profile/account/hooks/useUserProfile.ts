import { useMemo } from 'react';

import { useQuery } from '@/hooks/useApi';
import type { UserApi } from '@/types/api/account.type';
import type { ServerApiResponse } from '@/types/api/server.type';

export const useUserProfile = () => {
  const queryConfig = useMemo(
    () => ({
      method: 'GET',
      url: '/user/mypage',
    }),
    [],
  );

  const { data, isLoading, isError, error, execute } = useQuery<
    ServerApiResponse<UserApi>
  >(queryConfig, {
    enabled: true,
  });

  return {
    user: data?.result ?? null,
    isLoading,
    isError,
    error,
    refetch: execute,
  };
};
