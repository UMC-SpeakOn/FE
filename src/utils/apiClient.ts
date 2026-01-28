import axios, {
    type AxiosError,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;
const API_RETRY_COUNT = Number(import.meta.env.VITE_API_RETRY_COUNT) || 3;
const TOKEN_REFRESH_ENDPOINT = "/api/v1/auth/reissue";

// 토큰 저장 키
const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// 토큰 관리 유틸리티
export const tokenManager = {
    getAccessToken: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),
    getRefreshToken: (): string | null =>
        localStorage.getItem(REFRESH_TOKEN_KEY),
    setAccessToken: (token: string): void =>
        localStorage.setItem(ACCESS_TOKEN_KEY, token),
    setRefreshToken: (token: string): void =>
        localStorage.setItem(REFRESH_TOKEN_KEY, token),
    clearTokens: (): void => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
    hasTokens: (): boolean => {
        return !!(
            tokenManager.getAccessToken() && tokenManager.getRefreshToken()
        );
    },
};

// 타입 정의
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    authRequired?: boolean;
    _isRetry?: boolean;
    _retryCount?: number;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: false,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const customConfig = config as InternalAxiosRequestConfig &
            CustomAxiosRequestConfig;
        const token = tokenManager.getAccessToken();
        const authRequired = customConfig.authRequired ?? true;

        // 인증이 필요하고 토큰이 있으면 헤더에 추가
        if (authRequired && token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve();
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as
            | (InternalAxiosRequestConfig & CustomAxiosRequestConfig)
            | undefined;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        // 401 에러 처리 (인증 실패)
        if (error.response?.status === 401 && !originalRequest._isRetry) {
            // 토큰 재발급 엔드포인트 자체에서 401 발생 시
            if (originalRequest.url === TOKEN_REFRESH_ENDPOINT) {
                tokenManager.clearTokens();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            // 토큰 재발급 진행 중이면 대기열에 추가
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => apiClient(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._isRetry = true;
            isRefreshing = true;

            try {
                const refreshToken = tokenManager.getRefreshToken();
                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                // 토큰 재발급 요청
                const response = await apiClient.post<{ data: TokenResponse }>(
                    TOKEN_REFRESH_ENDPOINT,
                    {},
                    {
                        headers: { "X-Refresh-Token": refreshToken },
                        authRequired: false,
                    } as CustomAxiosRequestConfig
                );

                const { accessToken, refreshToken: newRefreshToken } =
                    response.data.data;

                // 새 토큰 저장
                tokenManager.setAccessToken(accessToken);
                tokenManager.setRefreshToken(newRefreshToken);

                // 대기열의 모든 요청 재시도
                processQueue();

                // 원본 요청 재시도
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                }
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as AxiosError);
                tokenManager.clearTokens();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // 5xx 서버 에러 재시도 로직
        if (
            error.response?.status &&
            error.response.status >= 500 &&
            (originalRequest._retryCount ?? 0) < API_RETRY_COUNT
        ) {
            originalRequest._retryCount = (originalRequest._retryCount ?? 0) + 1;

            // 지수 백오프 (exponential backoff)
            const delay = Math.min(1000 * 2 ** originalRequest._retryCount, 5000);
            await new Promise((resolve) => setTimeout(resolve, delay));

            return apiClient(originalRequest);
        }

        // 그 외 에러는 그대로 반환
        return Promise.reject(error);
    }
);

// 유틸리티 함수
/**
 * API 에러 메시지 추출
 */
export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string }>;
        return (
            axiosError.response?.data?.message ||
            axiosError.message ||
            "알 수 없는 오류가 발생했습니다."
        );
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "알 수 없는 오류가 발생했습니다.";
};

/**
 * 인증이 필요 없는 요청을 위한 헬퍼
 */
export const createPublicRequest = (
    config: AxiosRequestConfig
): CustomAxiosRequestConfig => ({
    ...config,
    authRequired: false,
});

export default apiClient;
