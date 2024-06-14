export type ApiErrorResponse = {
  message: string;
  stack?: string;
};

export type ApiResponse<T> = {
  status: number;
  error?: ApiErrorResponse;
  data?: T;
  message?: string;
};

export type ApiPromise<T> = Promise<ApiResponse<T>>;

export const createApiPromiseFrom = <T>(
  status: number,
  data: T
): ApiPromise<T> => {
  return Promise.resolve({
    status,
    data,
  } as ApiResponse<T>);
};


export const createErroredApiPromiseFrom = <T>(
    status: 204 | 500 | 502,
    message: string
  ): ApiPromise<T> => {
    return Promise.resolve({
      status,
      error: { message },
    } as ApiResponse<T>);
  };