import { baseURL, routes, SearchParams, staticTxt, unionValues } from './constants';
import { isNotEmptyString, resolveApiErrorMessage } from './helpers';
import { useAdaptiveThumbnail, useResponsiveLazyLoad, useSyncURLParams } from './hooks';
import type {
  ICatDetails,
  IDogDetails,
  IFarmAnimalsDetails,
  IHorseDetails,
  IPet,
  IPetByCodeResponse,
  IPetByCodeWithSimilarPetsResponse,
  IPetMeta,
  IPetResponse,
  IPetWithDetailsResponse,
  Thumbnails,
  ThumbnailSizes,
} from './interfaces';
import {
  store,
  useGetPetByCodeQuery,
  useGetPetByCodeWithSpeciesDetailsAndSimilarPetsQuery,
  useGetPetByCodeWithSpeciesDetailsQuery,
  useGetPetsQuery,
  useGetPetsWithDetailsQuery,
} from './store';

export {
  baseURL,
  isNotEmptyString,
  resolveApiErrorMessage,
  routes,
  SearchParams,
  staticTxt,
  store,
  unionValues,
  useAdaptiveThumbnail,
  useGetPetByCodeQuery,
  useGetPetByCodeWithSpeciesDetailsAndSimilarPetsQuery,
  useGetPetByCodeWithSpeciesDetailsQuery,
  useGetPetsQuery,
  useGetPetsWithDetailsQuery,
  useResponsiveLazyLoad,
  useSyncURLParams,
};
export type {
  ICatDetails,
  IDogDetails,
  IFarmAnimalsDetails,
  IHorseDetails,
  IPet,
  IPetByCodeResponse,
  IPetByCodeWithSimilarPetsResponse,
  IPetMeta,
  IPetResponse,
  IPetWithDetailsResponse,
  Thumbnails,
  ThumbnailSizes,
};
