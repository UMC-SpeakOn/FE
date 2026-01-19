import { useCallback } from 'react';
import type { NavigateOptions } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type NavigateToOptions = NavigateOptions & {
  newTab?: boolean;
};

const isHttpUrl = (path: string) => /^https?:\/\//.test(path);

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (path: string, options?: NavigateToOptions) => {
      if (isHttpUrl(path)) {
        const newTab = options?.newTab ?? true;

        if (newTab) {
          window.open(path, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = path;
        }
        return;
      }

      navigate(path, options);
    },
    [navigate],
  );

  return { navigateTo };
};

export default useNavigation;
