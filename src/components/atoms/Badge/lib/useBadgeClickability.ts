import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const CLICKABLE_ROUTES = ['/home'] as const;

// TODO: REMOVE

/**
 * A hook that determines whether badge elements should be clickable
 * based on the current URL pathname.
 *
 * @returns {{
 *   isClickable: boolean;
 * }} An object containing:
 * - `isClickable`: `true` if the current route allows badge clicks, `false` otherwise.
 */
export function useBadgeClickability(): { isClickable: boolean } {
  const { pathname } = useLocation();

  return useMemo(() => {
    const isClickable = CLICKABLE_ROUTES.some(
      route => pathname === route || pathname.startsWith(route + '?'),
    );

    return { isClickable };
  }, [pathname]);
}
