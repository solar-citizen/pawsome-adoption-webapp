import { createApi } from '@reduxjs/toolkit/query/react';

import type { GetPetsParams } from '#src/api';
import { PetAPI } from '#src/api';
import { type IPet, type IPetResponse, type IPetWithDetailsResponse } from '#src/lib';

export const petSlice = createApi({
  reducerPath: 'petSlice',
  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: () => ({ data: null }),
  endpoints: builder => ({
    getPets: builder.query<IPetResponse, GetPetsParams | undefined>({
      queryFn: async params => {
        try {
          const data = await PetAPI.getPets(params);
          return { data };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return { error: { status: 'FETCH_ERROR', error: message } };
        }
      },
    }),

    getPetsWithDetails: builder.query<IPetWithDetailsResponse, GetPetsParams | undefined>({
      queryFn: async params => {
        try {
          const data = await PetAPI.getPetsWithDetails(params);
          return { data };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return { error: { status: 'FETCH_ERROR', error: message } };
        }
      },
    }),

    getPetByCode: builder.query<IPet, string>({
      queryFn: async (lk_pet_code: string) => {
        try {
          const data = await PetAPI.getPetById(lk_pet_code);
          return { data };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return { error: { status: 'FETCH_ERROR', error: message } };
        }
      },
    }),
  }),
});

export const { useGetPetsQuery, useGetPetsWithDetailsQuery, useGetPetByCodeQuery } = petSlice;
