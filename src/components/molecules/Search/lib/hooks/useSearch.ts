import { useDebouncedCallback } from 'use-debounce';

import { useSyncURLParams } from '#/lib';

type UseSearchProps = {
  searchValue: string
  setSearchValue: (value: string) => void
  searchParam: string
  onSearch?: (value: string) => void
}

/**
 * Manages local searchValue state, debounces updates, synchronizes the `searchParam` in URL,
 * and invokes an optional `onSearch` callback with the final trimmed value.
 *
 * @param props
 *    Search hook configuration
 * @param {string} props.searchValue
 *    Current search input value
 * @param {fn} props.setSearchValue
 *    Setter for local searchValue state
 * @param {string} props.searchParam
 *    Query param key for the search term
 * @param {fn} props.onSearch
 *    Callback invoked when a debounced search is performed
 * @returns
 *    An object of handlers: handleChange, handleImmediateSearch, handleClear
 */
export function useSearch({ searchValue, setSearchValue, searchParam, onSearch }: UseSearchProps) {
  const syncParams = useSyncURLParams({}, false);

  const performSearch = useDebouncedCallback((value: string) => {
    const trimmed = value.trim();
    syncParams({ [searchParam]: trimmed || null });
    if (trimmed && onSearch) onSearch(trimmed);
  }, 2000);

  const handleChange = (value: string) => {
    setSearchValue(value);
    performSearch(value);
  };

  const handleImmediateSearch = () => {
    performSearch.cancel();
    const trimmed = searchValue.trim();
    syncParams({ [searchParam]: trimmed || null });
    if (trimmed && onSearch) onSearch(trimmed);
  };

  const handleClear = () => {
    setSearchValue('');
    syncParams({ [searchParam]: null });
  };

  return { handleChange, handleImmediateSearch, handleClear };
}
