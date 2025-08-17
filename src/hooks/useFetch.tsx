import userInfoStore from '@/store/userStore';
import { useState, useEffect, useCallback } from 'react';

interface UseFetchOptions extends RequestInit {
  autoFetch?: boolean;
}

export function useFetch<T = unknown>(url: string, options: UseFetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userInfo } = userInfoStore();

  const fetchData = useCallback(async (): Promise<T | null> => {
    if (!url) return null;

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${userInfo?.login_token}`,
        },
        signal,
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const result: T = await res.json();
      setData(result);
      return result;
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, options.headers, userInfo?.login_token]);

  useEffect(() => {
    if (options.autoFetch === false) return;

    // We need to create a new controller per useEffect for cleanup
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchOnMount = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/${url}`, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${userInfo?.login_token}`,
          },
          signal,
        });

        if (!res.ok) throw new Error('Network response was not ok');

        const result: T = await res.json();
        setData(result);
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOnMount();

    return () => controller.abort();
  }, [url, options.autoFetch, options.headers, userInfo?.login_token]);

  return { data, error, loading, refetch: fetchData };
}
