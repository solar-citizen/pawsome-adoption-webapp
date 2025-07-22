import type {
  IPetByCodeResponse,
  IPetByCodeWithSimilarPetsResponse,
  IPetResponse,
  IPetWithDetailsResponse,
} from '#src/lib';

import { createGetPetByCodeEndpoint } from './createGetPetByCodeEndpoint';
import { createGetPetsEndpoint } from './createGetPetsEndpoint';

export const PetAPI = {
  getPets: createGetPetsEndpoint<IPetResponse>('/pets', false),
  getPetsWithDetails: createGetPetsEndpoint<IPetWithDetailsResponse>('/pets', true),
  getPetByCode: async (petCode: string) => {
    return await createGetPetByCodeEndpoint<IPetByCodeResponse>(`/pets/${petCode}`);
  },
  getPetByCodeWithSpeciesDetails: async (petCode: string) => {
    return await createGetPetByCodeEndpoint<IPetByCodeResponse>(
      `/pets/with-species-details/${petCode}`,
    );
  },
  getPetByCodeWithSpeciesDetailsAndSimilarPets: async (petCode: string) => {
    return await createGetPetByCodeEndpoint<IPetByCodeWithSimilarPetsResponse>(
      `/pets/with-similar/${petCode}`,
    );
  },
};
