/**
 * Type guard that excludes empty string, null, and undefined from any type T.
 *
 * This utility function helps differentiate between valid parameter values and
 * empty/missing values in TypeScript with proper type narrowing.
 *
 * @template T
 *      The input type to check
 *
 * @param {T | '' | null | undefined} value
 *      The value to check.
 *      Could be of type T or one of the invalid values: empty string (''), null, or undefined.
 *
 * @returns {boolean}
 *      Returns `true` if the value is neither an empty string,
 *      null, nor undefined, indicating it's a valid value of type T.
 *      TypeScript will narrow the type to `Exclude<T, '' | null | undefined>`
 *      when this returns true.
 *
 * @example
 *      // For string parameters
 *      const param: string | '' | null | undefined = getParam();
 *      if (isValidParamValue(param)) {
 *        // param is guaranteed to be a non-empty string here
 *        doSomethingWithString(param);
 *      }
 *
 * @example
 *      // For number parameters
 *      const id: number | null | undefined = getId();
 *      if (isValidParamValue(id)) {
 *        // id is guaranteed to be a number here (not null or undefined)
 *        fetchRecord(id);
 *      }
 */
export function isValidParamValue<T>(
  value: T | '' | null | undefined,
): value is Exclude<T, '' | null | undefined> {
  return value !== '' && value != null;
}
