import { baseURL, routes, SearchParams, staticTxt } from './constants';
import { isNotEmptyString } from './helpers';
import { useSyncURLParams } from './hooks';
import type { IPet, IPetMeta, IPetResponse } from './interfaces';
import { store, useGetPetByIdQuery, useGetPetsQuery } from './store';

export {
  baseURL,
  isNotEmptyString,
  routes,
  SearchParams,
  staticTxt,
  store,
  useGetPetByIdQuery,
  useGetPetsQuery,
  useSyncURLParams,
};
export type { IPet, IPetMeta, IPetResponse };
