import { random } from 'lodash-es';

type HSLOptions = {
  hueMin?: number;
  hueMax?: number;
  satMin?: number;
  satMax?: number;
  lightMin?: number;
  lightMax?: number;
};

/**
 * Returns a random HSL string with customizable ranges
 * @param {Object} options - Configuration object
 * @param {number} [options.hueMin=0] - Minimum hue (0-360)
 * @param {number} [options.hueMax=360] - Maximum hue (0-360)
 * @param {number} [options.satMin=0] - Minimum saturation (0-100)
 * @param {number} [options.satMax=100] - Maximum saturation (0-100)
 * @param {number} [options.lightMin=0] - Minimum lightness (0-100)
 * @param {number} [options.lightMax=100] - Maximum lightness (0-100)
 * @returns {string} HSL color string
 */
export function getRandomHSL({
  hueMin = 0,
  hueMax = 360,
  satMin = 0,
  satMax = 100,
  lightMin = 0,
  lightMax = 100,
}: HSLOptions = {}): string {
  const h = random(hueMin, hueMax);
  const s = random(satMin, satMax);
  const l = random(lightMin, lightMax);
  return `hsl(${h.toString()}, ${s.toString()}%, ${l.toString()}%)`;
}

/**
 * Returns a random pastel HSL string
 * - Saturation: 20–40%
 * - Lightness: 80–95%
 */
export function getRandomPastelHSL() {
  return getRandomHSL({
    satMin: 20,
    satMax: 40,
    lightMin: 80,
    lightMax: 95,
  });
}

/**
 * Returns a random vibrant HSL string
 * - Saturation: 70–100%
 * - Lightness: 40–70%
 */
export function getRandomVibrantHSL() {
  return getRandomHSL({
    satMin: 70,
    satMax: 100,
    lightMin: 40,
    lightMax: 70,
  });
}

/**
 * Returns a random muted HSL string
 * - Saturation: 10–30%
 * - Lightness: 30–70%
 */
export function getRandomMutedHSL() {
  return getRandomHSL({
    satMin: 10,
    satMax: 30,
    lightMin: 30,
    lightMax: 70,
  });
}
