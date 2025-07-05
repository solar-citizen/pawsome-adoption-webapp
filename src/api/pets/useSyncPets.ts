import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useSearchParams } from 'react-router-dom';

import { type IPet, type IPetMeta, SearchParams, useGetPetsQuery } from '#src/lib';

type ApiError = {
  status: number;
  data: {
    error: string;
  };
};

type UseSyncPetsResult = {
  pets: IPet[];
  meta: IPetMeta;
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError | ApiError | undefined;
  errorMessage?: string;
};

const { fullTextSearch, pagination } = SearchParams.herobanner;
const { limit, page } = pagination;

/**
 * Synchronizes pet data with the URL's query string.:
 *
 * 1. Reads `page`, `limit`, and `full_text_search` from the URL query string.
 * 2. Calls the `useGetPetsQuery` endpoint with those parameters.
 * 3. Returns the normalized pets array, meta object, loading/error flags, error.
 *
 * @returns {UseSyncPetsResult}
 *    The current pets data, metadata, and status flags.
 */
export function useSyncPets(): UseSyncPetsResult {
  const [searchParams] = useSearchParams();

  const pageParam = Number(searchParams.get(page)) || 1;
  const limitParam = Number(searchParams.get(limit)) || 10;
  const fullTextSearchParam = searchParams.get(fullTextSearch) || null;

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetPetsQuery({
    page: pageParam,
    limit: limitParam,
    full_text_search: fullTextSearchParam,
  });

  const pets: IPet[] = response?.data ?? [];
  const meta: IPetMeta = response?.meta ?? {
    currentPage: pageParam,
    perPage: limitParam,
    lastPage: 1,
    from: 0,
    to: 0,
    total: 0,
  };

  const getErrorMessage = (error: unknown): string | undefined => {
    if (!error) return undefined;

    if (typeof error === 'object') {
      // Check for FetchBaseQueryError pattern
      if (
        'status' in error &&
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'error' in error.data
      ) {
        return (error.data as { error: string }).error;
      }

      // Check for SerializedError pattern
      if ('message' in error && typeof error.message === 'string') {
        return error.message;
      }
    }

    return 'An error occurred while fetching pets';
  };

  const errorMessage = getErrorMessage(error);

  return {
    pets,
    meta,
    isLoading,
    isError,
    error: error as FetchBaseQueryError | SerializedError | ApiError | undefined,
    errorMessage,
  };
}

export default useSyncPets;
