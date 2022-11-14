import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = `live_CqWfe3zoa8ucUnrhBYtcz5dvY7OOAPXZUD856Lf7C4SeVzy56bAO9ZrjP9ZeTA6C`;

export const breedsApi = createApi({
  reducerPath: 'breeds',
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://api.thecatapi.com/v1/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('x-api-key', API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Breed'],
  endpoints: (builder) => ({
    getBreeds: builder.query({
      query: () => `breeds`,
      providesTags: ['Breed'],
    }),
  }),
});

export const { useGetBreedsQuery } = breedsApi;
