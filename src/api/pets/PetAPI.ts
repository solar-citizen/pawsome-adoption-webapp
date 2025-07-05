import { IPetResponse, IPetWithDetailsResponse } from '#src/lib';

import { createGetPetEndpoint } from './createGetPetEndpoint';

export const PetAPI = {
  getPets: createGetPetEndpoint<IPetResponse>('/pets', false),
  getPetsWithDetails: createGetPetEndpoint<IPetWithDetailsResponse>('/pets', true),
};
