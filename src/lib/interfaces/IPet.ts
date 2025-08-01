import { unionValues } from '#src/lib';

import type { ICatDetails } from './ICatDetails';
import type { IDogDetails } from './IDogDetails';
import type { IFarmAnimalsDetails } from './IFarmAnimalsDetails';
import type { IHorseDetails } from './IHorseDetails';

export type IPetWithDogDetails = IPet & {
  dogDetails: IDogDetails;
};

export type IPetWithCatDetails = IPet & {
  catDetails: ICatDetails;
};

export type IPetWithHorseDetails = IPet & {
  horseDetails: IHorseDetails;
};

export type IPetWithFarmAnimalDetails = IPet & {
  farmAnimalDetails: IFarmAnimalsDetails;
};

export type IPetFiles = {
  photos?: string[];
  documents?: string[];
};

export type ThumbnailSizes = '800x600' | '640x480' | '400x300';
export type Thumbnails = Record<ThumbnailSizes, string[]> | undefined;

export type IPet = {
  id: number;
  lk_pet_code: string;
  name: string;
  breed: string;
  specie: Specie;
  age_int: number;
  sex_txt: string;
  description_txt?: string | null;
  special_needs: string | null;
  health: string | null;
  thumbnails: Thumbnails;
  is_available: boolean;
  is_sterilized_flg: boolean;
  created_at: Date;
  updated_at: Date;
  dogDetails?: IDogDetails;
  catDetails?: ICatDetails;
  horseDetails?: IHorseDetails;
  farmAnimalDetails?: IFarmAnimalsDetails;
};

export type IPetMeta = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  from: number;
  to: number;
  total: number;
};

export type IPetResponse = {
  data: IPet[];
  meta: IPetMeta;
};

export type IPetByCodeResponse = {
  data: IPet;
};

export type IPetByCodeWithSimilarPetsResponse = {
  main: IPet;
  photos: string[];
  documents: string[];
  similar: IPet[];
};

export type PetDetailsData = ICatDetails | IDogDetails | IHorseDetails | IFarmAnimalsDetails;
export type Specie = (typeof unionValues.SPECIES)[number];
