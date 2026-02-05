import { useMutation } from '@/hooks/useApi';
import type { ReportUpdateRequest } from '@/types/api/myreport.type';

export const useReportUpdate = () => {
  return useMutation<void, ReportUpdateRequest>(
    ({ reportId, feedback, difficulty }) => ({
      method: 'PATCH',
      url: `/reports/${reportId}/reflection`,
      data: { feedback, difficulty },
    }),
  );
};
