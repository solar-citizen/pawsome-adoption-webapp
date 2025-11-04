import { createApi } from '@reduxjs/toolkit/query/react';

import type { GetPetsParams } from '#src/api';
import { PetAPI } from '#src/api';
import type {
  IPetByCodeResponse,
  IPetByCodeWithSimilarPetsResponse,
  IPetResponse,
  IPetWithDetailsResponse,
} from '#src/lib';

import { createGetQueryFn } from './lib';

export const petSlice = createApi({
  reducerPath: 'petSlice',
  keepUnusedDataFor: 600,
  refetchOnMountOrArgChange: false,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  baseQuery: () => ({ data: null }),
  endpoints: builder => ({
    getPets: builder.query<IPetResponse, GetPetsParams | undefined>({
      queryFn: createGetQueryFn(PetAPI.getPets),
    }),

    getPetsWithDetails: builder.query<IPetWithDetailsResponse, GetPetsParams | undefined>({
      queryFn: createGetQueryFn(PetAPI.getPetsWithDetails),
    }),

    getPetByCode: builder.query<IPetByCodeResponse, string>({
      queryFn: createGetQueryFn(PetAPI.getPetByCode),
    }),

    getPetByCodeWithSpeciesDetails: builder.query<IPetByCodeResponse, string>({
      queryFn: createGetQueryFn(PetAPI.getPetByCodeWithSpeciesDetails),
    }),

    getPetByCodeWithSpeciesDetailsAndSimilarPets: builder.query<
      IPetByCodeWithSimilarPetsResponse,
      string
    >({
      queryFn: createGetQueryFn(PetAPI.getPetByCodeWithSpeciesDetailsAndSimilarPets),
    }),
  }),
});

export const {
  useGetPetsQuery,
  useGetPetsWithDetailsQuery,
  useGetPetByCodeQuery,
  useGetPetByCodeWithSpeciesDetailsQuery,
  useGetPetByCodeWithSpeciesDetailsAndSimilarPetsQuery,
} = petSlice;
