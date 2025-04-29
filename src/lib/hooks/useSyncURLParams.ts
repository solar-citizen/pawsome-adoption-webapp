import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Synchronizes a set of key/value pairs with the URL’s query string.
 *
 * On mount (and whenever `initialParams` or `replace` change), writes all
 * entries in `initialParams` into the URL—deleting any whose value is
 * `null` or `''`.  Returns a `syncParams` callback for imperative updates.
 *
 * @param initialParams
 *   An object mapping query-param names to their desired values.
 *   If a value is `null` or empty string, that param will be removed.
 * @param replace
 *   If `true`, replaces the current history entry; if `false` (default),
 *   pushes a new entry.
 * @returns
 *   A function `(params, replaceOverride?)` you can call at any time to
 *   update or delete specific params.  The second boolean argument
 *   overrides the default `replace` behavior.
 */
export function useSyncURLParams(
  initialParams: Record<string, string | null | undefined>,
  replace: boolean = false,
) {
  const [, setSearchParams] = useSearchParams();

  const syncParams = useCallback(
    (params: Record<string, string | null | undefined>, replaceOverride?: boolean) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          for (const [key, value] of Object.entries(params)) {
            if (value == null || value === '') {
              next.delete(key);
            } else if (next.get(key) !== value) {
              next.set(key, value);
            }
          }
          return next;
        },
        { replace: replaceOverride ?? replace },
      );
    },
    [replace, setSearchParams],
  );

  useEffect(() => {
    syncParams(initialParams, replace);
  }, [initialParams, replace, syncParams]);

  return syncParams;
}
