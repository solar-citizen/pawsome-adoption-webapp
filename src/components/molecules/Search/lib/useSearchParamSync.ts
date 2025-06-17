import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseSearchParamSyncProps = {
  searchParam: string;
  setSearchValue: (searchParam: string) => void;
};

/**
 * Synchronizes a single URL search parameter into local state.
 *
 * This hook reads the current value of `searchParam` from the URL search string
 * and updates the provided `setSearchValue` callback whenever it changes.
 *
 * @param {UseSearchParamSyncProps} props - Configuration object.
 * @param {string} props.searchParam
 *   The name of the URL query parameter to read (e.g. 'q' or 'page').
 * @param {(value: string) => void} props.setSearchValue
 *   Callback invoked with the query parameter’s value (or an empty string if absent),
 *   allowing you to sync it into local component state.
 * @returns {void}
 */
export function useSearchParamSync({ searchParam, setSearchValue }: UseSearchParamSyncProps): void {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const param = searchParams.get(searchParam) ?? '';
    setSearchValue(param);
  }, [searchParams, searchParam, setSearchValue]);
}
