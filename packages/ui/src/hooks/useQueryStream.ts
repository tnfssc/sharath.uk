import {
  type DefaultError,
  QueryClient,
  type QueryKey,
  type UndefinedInitialDataOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { useState } from 'react';

const cache = new Map<string, unknown[]>();

export const useQueryStream = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: Omit<
    UndefinedInitialDataOptions<ReadableStream<TQueryFnData>, TError, TData, TQueryKey>,
    | 'behavior'
    | 'persister'
    | 'placeholderData'
    | 'refetchInterval'
    | 'refetchOnMount'
    | 'refetchOnReconnect'
    | 'refetchOnWindowFocus'
    | 'select'
    | 'throwOnError'
  >,
  queryClient?: QueryClient,
): Omit<UseQueryResult<TQueryFnData[], TError>, 'refetch'> => {
  const [streamed, setStreamed] = useState<TQueryFnData[]>([]);

  const cacheKey = JSON.stringify(options.queryKey);

  const query = useQuery<string, TError, string, TQueryKey>(
    {
      ...options,
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: options.queryKey,
      queryFn: async (params) => {
        if (typeof options.queryFn !== 'function') throw new Error('queryFn must be a function');
        const readableStream = await options.queryFn(params);
        const _streamed = [] as TQueryFnData[];
        const writableStream = new WritableStream<TQueryFnData>({
          write: (value) => {
            setStreamed((prev) => prev.concat(value));
            _streamed.push(value);
          },
        });

        await readableStream.pipeTo(writableStream), { signal: params.signal };
        cache.set(cacheKey, _streamed);
        return 'done';
      },
      enabled: cache.has(cacheKey) ? false : options.enabled,
    },
    queryClient,
  );

  if (cache.has(cacheKey)) {
    return { ...query, data: cache.get(cacheKey) as TQueryFnData[] };
  }

  return { ...query, data: streamed };
};
