import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { GetPetsParams } from '#src/api';
import { baseURL, IPet, IPetResponse } from '#src/lib';

import { isValidParamValue } from './lib';

export const petSlice = createApi({
  reducerPath: 'petSlice',
  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: builder => ({
    getPets: builder.query<IPetResponse, GetPetsParams | undefined>({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (isValidParamValue(value)) {
            queryParams.append(key, value.toString());
          }
        });

        return {
          url: 'pets',
          params: queryParams,
        };
      },
    }),

    getPetById: builder.query<IPet, string>({
      keepUnusedDataFor: 1200,
      query: petCode => `pets/${petCode}`,
    }),
  }),
});

export const { useGetPetsQuery, useGetPetByIdQuery } = petSlice;
