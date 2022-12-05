import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = `live_CqWfe3zoa8ucUnrhBYtcz5dvY7OOAPXZUD856Lf7C4SeVzy56bAO9ZrjP9ZeTA6C`;

export const catApi = createApi({
  reducerPath: 'catApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ' https://api.thecatapi.com/v1/',
    prepareHeaders: (headers) => {
      headers.set('x-api-key', API_KEY);
      return headers;
    },
  }),
  refetchOnReconnect: true,
  tagTypes: ['Breeds', 'Images', 'Favourite'],

  endpoints: (builder) => ({
    getBreedList: builder.query({
      query: () => `breeds`,
    }),
    getAllImages: builder.query({
      query: ({ order, type, breedId, limit, page }) =>
        `/images/search?order=${order}&limit=${limit}&page=${page}&mime_types=${type}&breed_ids=${breedId}`,
      transformResponse(response, meta) {
        return {
          response,
          totalCount: Number(meta.response.headers.get('pagination-count')),
        };
      },
    }),
    addFavourite: builder.mutation({
      query: (body) => ({
        url: `/favourites`,
        method: 'POST',
        body,
      }),
    }),
    removeFavourite: builder.mutation({
      query: (id) => ({
        url: `/favourites/${id}`,
        method: 'DELETE',
      }),
    }),

    getAllFavourite: builder.query({
      query: ({ userId, limit, page }) =>
        `/favourites?sub_id=${userId}&limit=${limit}&page=${page}`,
    }),
  }),
});

export const {
  useGetBreedListQuery,
  useGetAllFavouriteQuery,
  useRemoveFavouriteMutation,
  useAddFavouriteMutation,
  useGetAllImagesQuery,
} = catApi;
