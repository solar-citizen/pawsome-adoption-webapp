import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useSearchParams } from 'react-router-dom';

import { type IPet, type IPetMeta, useGetPetsQuery } from '#src/lib';

type UseSyncPetsResult = {
  pets: IPet[];
  meta: IPetMeta;
  isLoading: boolean;
  isError: boolean;
  error?: FetchBaseQueryError | SerializedError | undefined;
};

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

  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const fullTextSearch = searchParams.get('full_text_search') || null;

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetPetsQuery({
    page,
    limit,
    full_text_search: fullTextSearch,
  });

  const pets: IPet[] = response?.data ?? [];
  const meta: IPetMeta = response?.meta ?? {
    currentPage: page,
    perPage: limit,
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
