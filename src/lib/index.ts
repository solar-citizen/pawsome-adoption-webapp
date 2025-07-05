import { baseURL, routes, SearchParams, staticTxt } from './constants';
import { isNotEmptyString } from './helpers';
import { useSyncURLParams } from './hooks';
import type { IPet, IPetMeta, IPetResponse, IPetWithDetailsResponse } from './interfaces';
import { store, useGetPetByIdQuery, useGetPetsQuery, useGetPetsWithDetailsQuery } from './store';

export {
  baseURL,
  isNotEmptyString,
  routes,
  SearchParams,
  staticTxt,
  store,
  useGetPetByIdQuery,
  useGetPetsQuery,
  useGetPetsWithDetailsQuery,
  useSyncURLParams,
};
export type { IPet, IPetMeta, IPetResponse, IPetWithDetailsResponse };
