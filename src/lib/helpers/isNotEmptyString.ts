/**
 * Checks if a value is a non-empty string.
 *
 * @param {unknown} value
 *    The value to check
 * @returns {boolean}
 *    `true` if the value is a string with at least one non-whitespace character,`false` otherwise
 *
 * @example
 *    // Returns true
 *    isNotEmptyString("hello");
 *    isNotEmptyString(" hi ");
 *
 * @example
 *    // Returns false
 *    isNotEmptyString("");
 *    isNotEmptyString("   ");
 *    isNotEmptyString(null);
 *    isNotEmptyString(undefined);
 *    isNotEmptyString(123);
 *    isNotEmptyString({});
 *
 * @remarks
 *    This function trims whitespace before checking the string length,
 *    so strings containing only whitespace characters are considered empty.
 */
export function isNotEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}
