import userInfoStore from '@/store/userStore';
import { useState } from 'react';

type RequestMethod = 'POST' | 'PUT';

interface RequestParams<T> {
  url: string;
  method?: RequestMethod;
  body: T;
  headers?: Record<string, string>;
}

interface UseSubmitRequestReturn<TResponse> {
  sendRequest: <TBody>(params: RequestParams<TBody>) => Promise<void>;
  loading: boolean;
  error: string | null;
  response: TResponse | null;
}

export function useSubmitRequest<TResponse = any>(): UseSubmitRequestReturn<TResponse> {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<TResponse | null>(null);
  const { userInfo } = userInfoStore();

  const sendRequest = async <TBody>(params: RequestParams<TBody>): Promise<void> => {
    const { url, method = 'POST', body, headers = {} } = params;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.login_token}`,
          ...headers,
        },
        body: JSON.stringify(body),
      });

      const data: TResponse = await res.json();
      setResponse(data);
      return data as any;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error, response };
}
