import { useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

type ScrollToTopOptions = {
  watchParams?: string[];
};

/**
 * Custom hook that scrolls to the top of the page when navigation state changes.
 *
 * @param options - Configuration options for when to trigger scroll
 * @param options.watchParams - Array of URL search parameter keys to watch for changes
 *
 * @returns A function to manually trigger scroll to top
 *
 * @example
 * ```tsx
 * // Basic usage - scroll on pathname changes only
 * useScrollToTop();
 *
 * // Watch specific search params
 * useScrollToTop({
 *   watchParams: ['page', 'filter'],
 * });
 *
 * // Get manual scroll function
 * const scrollToTop = useScrollToTop();
 * // Later: scrollToTop();
 * ```
 */
export function useScrollToTop({ watchParams = [] }: ScrollToTopOptions = {}): () => void {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  const dependencyKey = useMemo(() => {
    const deps: (string | null)[] = [
      location.pathname,
      ...watchParams.map(key => searchParams.get(key)),
    ];

    return JSON.stringify(deps);
  }, [location.pathname, searchParams, watchParams]);

  useEffect(() => {
    scrollToTop();
  }, [dependencyKey]);

  return scrollToTop;
}
