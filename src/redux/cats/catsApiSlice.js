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
  tagTypes: ['Breeds', 'Images', 'Favourites'],

  endpoints: (builder) => ({
    getBreedList: builder.query({
      query: () => `breeds`,
    }),
    getAllFavourite: builder.query({
      query: ({ userId, limit, page }) =>
        `/favourites?sub_id=${userId}&limit=${limit}&page=${page}`,
      providesTags: ['Favourites'],
    }),
    addFavourite: builder.mutation({
      query: (body) => ({
        url: `/favourites`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Favourites', id: 'LiST' }],
    }),
    removeFavourite: builder.mutation({
      query: (id) => ({
        url: `/favourites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Favourites', id: 'LiST' }],
    }),

    getAllImages: builder.query({
      query: ({ order, type, breedId, limit, page, userId }) =>
        `/images/search?sub_id=${userId}&order=${order}&limit=${limit}&page=${page}&mime_types=${type}&breed_ids=${breedId}`,
      transformResponse(response, meta) {
        return {
          response,
          totalCount: Number(meta.response.headers.get('pagination-count')),
        };
      },
      providesTags: [{ type: 'Favourites', id: 'LiST' }],
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
