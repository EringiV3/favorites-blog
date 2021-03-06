import { createClient } from 'microcms-js-sdk';
import type { ListContentPaginationInfo } from '../types';

export const microcmsClient = createClient({
  serviceDomain: 'uz70goojl3',
  apiKey: '2b8b449addcd4871877b4bdcf141ed7d7ee0', // read only なAPIキーなので露出してもOK
});

export const getAllContents = async <T extends ListContentPaginationInfo>(
  endPoint: string,
  filters?: string
): Promise<T[]> => {
  const LIMIT = 10;
  const firstContent = await microcmsClient.get<T>({
    endpoint: endPoint,
    queries: {
      offset: 0,
      limit: LIMIT,
      filters,
    },
  });

  const queries: { offset: number; limit: number }[] = [];
  let index = 1;
  while (firstContent.totalCount - LIMIT * index > 0) {
    queries.push({ offset: LIMIT * index, limit: LIMIT });
    index++;
  }

  const contents = await Promise.all(
    queries.map((query) =>
      microcmsClient.get<T>({
        endpoint: endPoint,
        queries: {
          offset: query.offset,
          limit: query.limit,
          filters,
        },
      })
    )
  );

  return [firstContent, ...contents];
};
