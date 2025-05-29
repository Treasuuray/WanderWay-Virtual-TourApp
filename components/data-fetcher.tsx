'use client';

import { useState, useEffect, ReactNode } from 'react';
import ErrorFallback from './error-fallback';

interface DataFetcherProps<T> {
  fetchFn: () => Promise<T>;
  children: (data: T) => ReactNode;
  loadingComponent?: ReactNode;
  errorComponent?: (error: Error, retry: () => void) => ReactNode;
}

export default function DataFetcher<T>({
  fetchFn,
  children,
  loadingComponent = <div>Loading...</div>,
  errorComponent
}: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <>{loadingComponent}</>;
  
  if (error) {
    return errorComponent ? (
      <>{errorComponent(error, fetchData)}</>
    ) : (
      <ErrorFallback error={error} resetErrorBoundary={fetchData} />
    );
  }
  
  if (!data) return <div>No data available</div>;
  
  return <>{children(data)}</>;
}