import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically scrolls the window to the top-left (0,0) whenever
 * the React Router location (pathname) changes.
 *
 * If you prefer no scroll animation, change `behavior: 'smooth'`
 * to `behavior: 'instant'`.
 *
 * Usage: Invoke this hook from any component that is mounted within
 * a <BrowserRouter> (or similar). Typically, you'd put this at the
 * root of your app or inside your main layout so that every route change
 * triggers it.
 *
 * @returns A function that can be called to manually scroll to top
 *
 * @example
 * ```tsx
 * function App() {
 *   const scrollToTop = useScrollToTop()
 *
 *   // Automatically scrolls on route changes
 *   // Can also call scrollToTop() manually if needed
 *
 *   return <div>...</div>
 * }
 * ```
 */
export function useScrollToTop(): () => void {
  const { pathname } = useLocation();

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return scrollToTop;
}
