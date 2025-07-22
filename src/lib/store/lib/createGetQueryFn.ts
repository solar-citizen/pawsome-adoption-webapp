/**
 * Creates a query executor that wraps an API call, returning data or a standardized error object.
 *
 * @template T - The type of the successful response data.
 * @template P - The type of parameters accepted by the API call.
 * @param apiCall - An async function that performs the API
 * request with parameters of type P and returns T.
 * @returns An async function that takes params of type P and returns a promise resolving to
 * an object with either a `data` property of type T or an `error` property with status and message.
 */
export function createGetQueryFn<T, P>(apiCall: (params: P) => Promise<T>) {
  return async (params: P) => {
    try {
      const data = await apiCall(params);
      return { data };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { error: { status: 'FETCH_ERROR', error: message } };
    }
  };
}
