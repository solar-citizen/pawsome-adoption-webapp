import { useMediaQuery } from 'usehooks-ts';

/**
 * Responsive lazy loading threshold configuration
 */
type LazyThresholdConfig = {
  mobile: number; // (< 640px)
  small: number; // (640px+)
  medium: number; // (768px+)
  large: number; // (1024px+)
  xl: number; // (1920px+)
};

/**
 * Default lazy loading thresholds for different screen sizes
 */
const DEFAULT_THRESHOLDS: LazyThresholdConfig = {
  mobile: 1,
  small: 3,
  medium: 8,
  large: 8,
  xl: 9,
};

/**
 * Custom hook that provides responsive lazy loading threshold based on screen size.
 *
 * This hook determines how many items should be loaded eagerly (non-lazy) based on
 * the current screen size. Larger screens can accommodate more items above the fold,
 * so they get higher thresholds.
 *
 * @param config - Optional configuration object to override default thresholds
 * @param config.mobile - Threshold for mobile screens (< 640px). Default: 1
 * @param config.small - Threshold for small screens (640px+). Default: 3
 * @param config.medium - Threshold for medium screens (768px+). Default: 8
 * @param config.large - Threshold for large screens (1024px+). Default: 8
 * @param config.xl - Threshold for extra large screens (1920px+). Default: 9
 *
 * @returns The appropriate lazy loading threshold for the current screen size
 *
 * @example
 * ```tsx
 * // Using default thresholds
 * const lazyThreshold = useResponsiveLazy()
 *
 * // Custom thresholds
 * const lazyThreshold = useResponsiveLazy({
 *   mobile: 2,
 *   small: 4,
 *   medium: 6,
 *   large: 10,
 *   xl: 12
 * })
 *
 * // Usage in component
 * {products.map(({ id, ...rest }, index) => (
 *   <ProductItem
 *     key={id}
 *     id={id}
 *     isLazy={index > lazyThreshold}
 *     {...rest}
 *   />
 * ))}
 * ```
 */
export function useResponsiveLazyLoad(config?: Partial<LazyThresholdConfig>): number {
  const thresholds = { ...DEFAULT_THRESHOLDS, ...config };

  const isMatchSmallScreen = useMediaQuery('(min-width: 640px)');
  const isMatchMediumScreen = useMediaQuery('(min-width: 768px)');
  const isMatchLargeScreen = useMediaQuery('(min-width: 1024px)');
  const isMatch1920Screen = useMediaQuery('(min-width: 1920px)');

  /**
   * Calculates the appropriate lazy loading threshold based on current screen size.
   * Uses a cascading approach where larger screens override smaller ones.
   *
   * @returns The threshold number for the current screen size
   */
  function getLazyThreshold(): number {
    if (isMatch1920Screen) return thresholds.xl;
    if (isMatchLargeScreen) return thresholds.large;
    if (isMatchMediumScreen) return thresholds.medium;
    if (isMatchSmallScreen) return thresholds.small;
    return thresholds.mobile;
  }

  return getLazyThreshold();
}
