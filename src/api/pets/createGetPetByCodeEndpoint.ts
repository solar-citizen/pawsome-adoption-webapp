import { createAxiosInstance } from '#src/api';

export async function createGetPetByCodeEndpoint<T>(endpoint: string): Promise<T> {
  const api = createAxiosInstance();
  const response = await api.get<T>(endpoint);
  return response.data;
}
