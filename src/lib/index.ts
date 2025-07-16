import { baseURL, routes, SearchParams, staticTxt, unionValues } from './constants';
import { isNotEmptyString } from './helpers';
import { useAdaptiveThumbnail, useSyncURLParams } from './hooks';
import type {
  IPet,
  IPetMeta,
  IPetResponse,
  IPetWithDetailsResponse,
  Thumbnails,
  ThumbnailSizes,
} from './interfaces';
import { store, useGetPetByIdQuery, useGetPetsQuery, useGetPetsWithDetailsQuery } from './store';

export {
  baseURL,
  isNotEmptyString,
  routes,
  SearchParams,
  staticTxt,
  store,
  unionValues,
  useAdaptiveThumbnail,
  useGetPetByIdQuery,
  useGetPetsQuery,
  useGetPetsWithDetailsQuery,
  useSyncURLParams,
};
export type { IPet, IPetMeta, IPetResponse, IPetWithDetailsResponse, Thumbnails, ThumbnailSizes };
