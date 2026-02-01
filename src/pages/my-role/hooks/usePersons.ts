import { useMemo } from 'react';

import { useApi } from '@/hooks/useApi';
import type { ApiResponse } from '@/types/common/common.type';

import type { PersonItem } from '../types/add.type';

export const usePersons = () => {
  const axiosConfig = useMemo(
    () => ({
      method: 'GET',
      url: '/avatar/list',
    }),
    [],
  );

  const { data, isLoading, isError } = useApi<ApiResponse<PersonItem[]>>(
    axiosConfig,
    { enabled: true },
  );

  return {
    response: data,
    isLoading,
    isError,
  };
};
