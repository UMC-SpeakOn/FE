// 서버 기본 응답
export interface ServerApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
