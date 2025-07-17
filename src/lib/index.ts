import { baseURL, routes, SearchParams, staticTxt, unionValues } from './constants';
import { isNotEmptyString } from './helpers';
import { useAdaptiveThumbnail, useSyncURLParams } from './hooks';
import type {
  ICatDetails,
  IDogDetails,
  IFarmAnimalsDetails,
  IHorseDetails,
  IPet,
  IPetMeta,
  IPetResponse,
  IPetWithDetailsResponse,
  Thumbnails,
  ThumbnailSizes,
} from './interfaces';
import { store, useGetPetByCodeQuery, useGetPetsQuery, useGetPetsWithDetailsQuery } from './store';

export {
  baseURL,
  isNotEmptyString,
  routes,
  SearchParams,
  staticTxt,
  store,
  unionValues,
  useAdaptiveThumbnail,
  useGetPetByCodeQuery,
  useGetPetsQuery,
  useGetPetsWithDetailsQuery,
  useSyncURLParams,
};
export type {
  ICatDetails,
  IDogDetails,
  IFarmAnimalsDetails,
  IHorseDetails,
  IPet,
  IPetMeta,
  IPetResponse,
  IPetWithDetailsResponse,
  Thumbnails,
  ThumbnailSizes,
};
