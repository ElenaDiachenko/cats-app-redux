import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const API_KEY = `live_CqWfe3zoa8ucUnrhBYtcz5dvY7OOAPXZUD856Lf7C4SeVzy56bAO9ZrjP9ZeTA6C`;

const baseQuery = fetchBaseQuery({
  baseUrl: ' https://api.thecatapi.com/v1/',
  prepareHeaders: (headers) => {
    headers.set('x-api-key', API_KEY);
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  refetchOnReconnect: true,
  tagTypes: ['Breeds', 'Images', 'Favorites', 'Votes'],
  endpoints: (builder) => ({}),
});
