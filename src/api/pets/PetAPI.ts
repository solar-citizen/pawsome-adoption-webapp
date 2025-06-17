import { IPetResponse } from '#src/lib';

import { createAxiosInstance } from '../createAxiosInstance';

const api = createAxiosInstance();

export type GetPetsParams = {
  limit?: number;
  page?: number;
  full_text_search?: string | null;
};

export const PetAPI = {
  getPets: (params?: GetPetsParams): Promise<IPetResponse> =>
    api
      .get<IPetResponse>('/pets', {
        params: {
          limit: params?.limit,
          page: params?.page,
          full_text_search: params?.full_text_search,
        },
      })
      .then(resp => resp.data),
};
