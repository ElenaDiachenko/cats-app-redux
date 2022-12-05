import { apiSlice } from '../apiSlice';

export const favouritesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetAllFavouriteQuery,
  useRemoveFavouriteMutation,
  useAddFavouriteMutation,
} = favouritesApiSlice;
