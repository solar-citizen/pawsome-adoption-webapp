import { createAxiosInstance } from '#src/api';
import { IPetResponse, SearchParams } from '#src/lib';

const api = createAxiosInstance();

const { fullTextSearch, pagination } = SearchParams.herobanner;
const { limit, page } = pagination;

export type GetPetsParams = {
  [limit]?: number;
  [page]?: number;
  [fullTextSearch]?: string | null;
};

export const PetAPI = {
  getPets: (params?: GetPetsParams): Promise<IPetResponse> =>
    api
      .get<IPetResponse>('/pets', {
        params: {
          [limit]: params?.[limit],
          [page]: params?.[page],
          [fullTextSearch]: params?.[fullTextSearch],
        },
      })
      .then(resp => resp.data),
};
