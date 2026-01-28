import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import apiClient, { getErrorMessage } from "@/utils/apiClient";

interface UseApiState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface UseApiOptions<T = unknown> {
  /** 컴포넌트 마운트 시 자동으로 API 호출 여부 */
  enabled?: boolean;
  /** 에러 발생 시 콜백 */
  onError?: (error: string) => void;
  /** 성공 시 콜백 */
  onSuccess?: (data: T) => void;
}

interface UseApiReturn<T> extends UseApiState<T> {
  /** API 호출 함수 */
  execute: () => Promise<T | null>;
  /** 상태 초기화 함수 */
  reset: () => void;
  /** 데이터 수동 설정 함수 */
  setData: (data: T | null) => void;
}

/**
 * API 호출을 위한 커스텀 훅
 * @param axiosConfig - Axios 요청 설정
 * @param options - 훅 옵션
 * @returns API 상태 및 실행 함수
 *
 * @example
 * const { data, isLoading, error, execute } = useApi<User>(
 *   { method: 'GET', url: '/api/v1/users/me' },
 *   { enabled: true }
 * );
 */
export function useApi<T = unknown>(
  axiosConfig: AxiosRequestConfig,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  const { enabled = false, onError, onSuccess } = options;

  // 상태 관리
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  // AbortController를 사용한 요청 취소 관리
  const abortControllerRef = useRef<AbortController | null>(null);

  // API 호출 함수
  const execute = useCallback(async (): Promise<T | null> => {
    // 이전 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 새로운 AbortController 생성
    abortControllerRef.current = new AbortController();

    setState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
      error: null,
    }));

    try {
      const response: AxiosResponse<T> = await apiClient({
        ...axiosConfig,
        signal: abortControllerRef.current.signal,
      });

      const responseData = response.data;

      setState({
        data: responseData,
        error: null,
        isLoading: false,
        isSuccess: true,
        isError: false,
      });

      if (onSuccess) {
        onSuccess(responseData);
      }

      return responseData;
    } catch (error: unknown) {
      // 요청이 취소된 경우 무시
      if ((error as { name?: string }).name === "CanceledError") {
        return null;
      }

      const errorMessage = getErrorMessage(error);

      setState({
        data: null,
        error: errorMessage,
        isLoading: false,
        isSuccess: false,
        isError: true,
      });

      if (onError) {
        onError(errorMessage);
      }

      return null;
    }
  }, [axiosConfig, onError, onSuccess]);

  // 상태 초기화 함수
  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  // 데이터 수동 설정 함수
  const setData = useCallback((data: T | null) => {
    setState((prev) => ({
      ...prev,
      data,
      isSuccess: data !== null,
    }));
  }, []);

  // enabled 옵션이 true일 때 자동 실행
  useEffect(() => {
    if (enabled) {
      execute();
    }
  }, [enabled, execute]);

  // 컴포넌트 언마운트 시 요청 취소
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

/**
 * POST/PUT/DELETE 등의 Mutation 요청을 위한 훅
 * @param axiosConfig - Axios 요청 설정 (함수 형태로 전달 가능)
 * @param options - 훅 옵션
 * @returns Mutation 상태 및 실행 함수
 *
 * @example
 * const { mutate, isLoading, error } = useMutation<CreateUserResponse>(
 *   (data) => ({ method: 'POST', url: '/api/v1/users', data }),
 *   { onSuccess: (data) => console.log('User created:', data) }
 * );
 *
 * // 사용
 * mutate({ name: 'John', email: 'john@example.com' });
 */
export function useMutation<TResponse = unknown, TVariables = unknown>(
  axiosConfigFn: (variables: TVariables) => AxiosRequestConfig,
  options: UseApiOptions<TResponse> = {}
) {
  const { onError, onSuccess } = options;

  const [state, setState] = useState<UseApiState<TResponse>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const mutate = useCallback(
    async (variables: TVariables): Promise<TResponse | null> => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        isError: false,
        error: null,
      }));

      try {
        const config = axiosConfigFn(variables);
        const response: AxiosResponse<TResponse> = await apiClient(config);
        const responseData = response.data;

        setState({
          data: responseData,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });

        if (onSuccess) {
          onSuccess(responseData);
        }

        return responseData;
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);

        setState({
          data: null,
          error: errorMessage,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });

        if (onError) {
          onError(errorMessage);
        }

        return null;
      }
    },
    [axiosConfigFn, onError, onSuccess]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

/**
 * GET 요청을 위한 훅 (자동 실행)
 * useApi의 enabled=true 버전의 별칭
 *
 * @example
 * const { data, isLoading, error, refetch } = useQuery<User[]>(
 *   { method: 'GET', url: '/api/v1/users' }
 * );
 */
export function useQuery<T = unknown>(
  axiosConfig: AxiosRequestConfig,
  options: UseApiOptions<T> = {}
): UseApiReturn<T> {
  return useApi<T>(axiosConfig, { ...options, enabled: true });
}
