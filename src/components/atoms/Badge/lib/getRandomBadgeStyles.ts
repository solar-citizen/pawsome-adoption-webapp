import { readableColor } from 'polished';

import { getRandomPastelHSL } from '#src/lib';

/**
 * Builds inline styles for badges with customizable color generation
 * @param {Function} [colorGenerator] - Function that returns HSL string
 */
export function getRandomBadgeStyles(colorGenerator: () => string = getRandomPastelHSL) {
  const bg = colorGenerator();
  return {
    backgroundColor: bg,
    color: readableColor(bg, '#000', '#fff', false),
    borderColor: 'transparent',
  };
}
