import { SpinnerVariant, SpinnerVariantConfig } from './types';

export type SpinnerStylesProps = {
  spinnerCircle?: string
  spinnerBar?: string[]
}

/**
 * Creates a configuration object for different spinner variants with their styling options.
 *
 * This function generates the necessary SVG element configurations for each spinner variant
 * (circle and bar), applying the provided CSS classes to style them.
 *
 * For the circle variant, it creates 7 circle elements with different opacities to create a loading
 * effect.
 * For the bar variant, it creates 3 rectangular elements positioned horizontally.
 *
 * @param {SpinnerStylesProps} styles
 *    Style classes to be applied to spinner elements
 * @returns {Record<SpinnerVariant, SpinnerVariantConfig>}
 *    A configuration object mapping each spinner variant to its respective element configurations
 *    and styling
 *
 * @example
 * // With CSS modules
 * import styles from './SpinnerIcon.module.css';
 *
 * // Create spinner options with adapted styles
 * const spinnerOptions = createSpinnerOptions({
 *   spinnerCircle: styles.spinnerCircle,
 *   spinnerBar: [styles.spinnerBar, styles.spinnerBar2, styles.spinnerBar3]
 * });
 *
 * @example
 * // Usage in component
 * const { elements, className } = spinnerOptions['circle'];
 * // Render elements in an SVG container
 */
export function createSpinnerOptions(
  styles: SpinnerStylesProps,
): Record<SpinnerVariant, SpinnerVariantConfig> {
  return {
    circle: {
      elements: [
        { type: 'circle', props: { cx: 12, cy: 2.5, r: 1.5, opacity: 0.14 } },
        { type: 'circle', props: { cx: 16.75, cy: 3.77, r: 1.5, opacity: 0.29 } },
        { type: 'circle', props: { cx: 20.23, cy: 7.25, r: 1.5, opacity: 0.43 } },
        { type: 'circle', props: { cx: 21.5, cy: 12, r: 1.5, opacity: 0.57 } },
        { type: 'circle', props: { cx: 20.23, cy: 16.75, r: 1.5, opacity: 0.71 } },
        { type: 'circle', props: { cx: 16.75, cy: 20.23, r: 1.5, opacity: 0.86 } },
        { type: 'circle', props: { cx: 12, cy: 21.5, r: 1.5, opacity: 1 } },
      ],
      className: styles.spinnerCircle,
    },
    bar: {
      elements: [
        {
          type: 'rect',
          props: { x: 1, y: 1, width: 6, height: 22, className: styles.spinnerBar?.[0] },
        },
        {
          type: 'rect',
          props: { x: 9, y: 1, width: 6, height: 22, className: styles.spinnerBar?.[1] },
        },
        {
          type: 'rect',
          props: { x: 17, y: 1, width: 6, height: 22, className: styles.spinnerBar?.[2] },
        },
      ],
    },
  };
}
