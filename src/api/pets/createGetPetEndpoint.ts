import { createAxiosInstance } from '#src/api';
import { SearchParams } from '#src/lib';

const api = createAxiosInstance();

const { fullTextSearch, pagination, representation } = SearchParams.herobanner;
const { limit, page } = pagination;
const { detailed } = representation;

export type GetPetsParams = {
  [limit]?: number;
  [page]?: number;
  [fullTextSearch]?: string | null;
};

/**
 * Creates a type‑safe GET request function for a 'pets' endpoint.
 *
 * @template T
 *   The shape of the expected response payload.
 * @param {string} endpoint
 *   The API path (e.g. `/pets` or `/pets/{id}`) to call.
 * @param {boolean} isDetailed
 *   Whether to request the 'detailed' representation.
 * @returns {(params?: GetPetsParams) => Promise<T>}
 *   A function that, when invoked, issues a GET with the provided
 *   pagination, full‑text search, and representation flags, returning
 *   a promise resolving to the parsed response data.
 *
 * @example
 * ```ts
 * // Creates a caller that fetches detailed banners:
 * const fetchBanners = createGetPetEndpoint<Banner[]>('/hero/banner', true);
 *
 * // Later in code:
 * fetchBanners({ page: 2, limit: 5, full_text_search: 'dragon' })
 *   .then(banners => console.log(banners));
 * ```
 */
export function createGetPetEndpoint<T>(
  endpoint: string,
  isDetailed: boolean,
): (params?: GetPetsParams) => Promise<T> {
  return (params?: GetPetsParams): Promise<T> =>
    api
      .get<T>(endpoint, {
        params: {
          [detailed]: isDetailed,
          [limit]: params?.[limit],
          [page]: params?.[page],
          [fullTextSearch]: params?.[fullTextSearch],
        },
      })
      .then(resp => resp.data);
}
