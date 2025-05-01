import axios, { AxiosError, AxiosInstance } from 'axios';

import { baseURL } from '#/lib';

export const createAxiosInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.interceptors.response.use(
    res => res,
    (err: AxiosError) => {
      console.error('API Error:', err.message);
      return Promise.reject(err);
    },
  );

  return api;
};
