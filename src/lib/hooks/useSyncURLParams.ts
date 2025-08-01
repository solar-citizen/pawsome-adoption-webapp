import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseSyncURLParamsProps = {
  initialParams: Record<string, string | null | undefined>;
  replace?: boolean;
};

/**
 * Synchronizes a set of key/value pairs with the URL's query string.
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
export function useSyncURLParams({ initialParams, replace = false }: UseSyncURLParamsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastParamsRef = useRef<string>('');

  const syncParams = useCallback(
    (params: Record<string, string | null | undefined>, replaceOverride?: boolean) => {
      setSearchParams(
        prev => {
          const next = new URLSearchParams(prev);
          let hasChanges = false;

          for (const [key, value] of Object.entries(params)) {
            if (value == null || value === '') {
              if (next.has(key)) {
                next.delete(key);
                hasChanges = true;
              }
            } else if (next.get(key) !== value) {
              next.set(key, value);
              hasChanges = true;
            }
          }

          return hasChanges ? next : prev;
        },
        { replace: replaceOverride ?? replace },
      );
    },
    [replace, setSearchParams],
  );

  useEffect(() => {
    const paramsString = JSON.stringify(
      Object.entries(initialParams)
        .sort(([a], [b]) => a.localeCompare(b))
        .filter(([, value]) => value != null && value !== ''),
    );

    if (paramsString !== lastParamsRef.current) {
      lastParamsRef.current = paramsString;

      const needsUpdate = Object.entries(initialParams).some(([key, value]) => {
        if (value == null || value === '') {
          return searchParams.has(key);
        }
        return searchParams.get(key) !== value;
      });

      if (needsUpdate) {
        setSearchParams(
          prev => {
            const next = new URLSearchParams(prev);
            let hasChanges = false;

            for (const [key, value] of Object.entries(initialParams)) {
              if (value == null || value === '') {
                if (next.has(key)) {
                  next.delete(key);
                  hasChanges = true;
                }
              } else if (next.get(key) !== value) {
                next.set(key, value);
                hasChanges = true;
              }
            }

            return hasChanges ? next : prev;
          },
          { replace },
        );
      }
    }
  }, [initialParams, replace, setSearchParams, searchParams]);

  return syncParams;
}
