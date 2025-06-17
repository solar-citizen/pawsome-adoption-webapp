import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useSearchParams } from 'react-router-dom';

import { type IPet, type IPetMeta, SearchParams, useGetPetsQuery } from '#src/lib';

type UseSyncPetsResult = {
  pets: IPet[];
  meta: IPetMeta;
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
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
    petsFrom: 0,
    petsTo: 0,
    petsTotal: 0,
  };

  return {
    pets,
    meta,
    isLoading,
    isError,
    error,
  };
}

export default useSyncPets;
