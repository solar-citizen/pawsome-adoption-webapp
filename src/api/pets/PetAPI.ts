import { IPet, IPetResponse, IPetWithDetailsResponse } from '#src/lib';

import { createAxiosInstance } from '..';
import { createGetPetEndpoint } from './createGetPetEndpoint';

export const PetAPI = {
  getPets: createGetPetEndpoint<IPetResponse>('/pets', false),
  getPetsWithDetails: createGetPetEndpoint<IPetWithDetailsResponse>('/pets', true),
  getPetById: async (petCode: string) => {
    const api = createAxiosInstance();
    const response = await api.get<IPet>(`/pets/${petCode}`);
    return response.data;
  },
};
