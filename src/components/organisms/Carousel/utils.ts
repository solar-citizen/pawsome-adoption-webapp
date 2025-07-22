/**
 * Converts a size value into a valid CSS length string.
 *
 * - If `size` is a number, it will be converted to a string with a `"px"` suffix.
 * - If `size` is already a string (e.g., `"1rem"` or `"50%"`), it is returned unchanged.
 *
 * @param size - A numeric value (interpreted as pixels) or any valid CSS length string.
 * @returns A string that represents the size in CSS format (e.g., `"16px"`, `"2rem"`, `"50%"`).
 */
export function normalizeSize(size: string | number): string {
  return typeof size === 'number' ? `${size.toString()}px` : size;
}

/**
 * Extracts the numeric portion of a CSS length string or returns the number directly.
 *
 * - If `size` is a number, it is returned as-is.
 * - If `size` is a string (e.g., `"20px"`, `"1.5rem"`, `"100%"`), this function strips
 *   out all non-numeric characters (except `-` and `.`) and parses the result as a float.
 * - If the parsing fails (e.g., `"abc"`), the function returns `0`.
 *
 * @param size - A numeric value or a CSS length string.
 * @returns The numeric portion of `size`. For example, `"20px"` → `20`, `"1.5rem"` → `1.5`,
 *          `"100%"` → `100`. Returns `0` if no valid number can be parsed.
 */
export function extractSize(size: string | number): number {
  if (typeof size === 'number') {
    return size;
  }
  const numericValue = parseFloat(size.replace(/[^\d.-]/g, ''));
  return isNaN(numericValue) ? 0 : numericValue;
}
