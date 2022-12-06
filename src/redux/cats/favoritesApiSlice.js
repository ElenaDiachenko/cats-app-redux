import { apiSlice } from '../apiSlice';

export const favoritesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFavorite: builder.query({
      query: ({ userId, limit, page }) =>
        `/favorites?sub_id=${userId}&limit=${limit}&page=${page}`,
      transformResponse(response, meta) {
        return {
          response,
          totalCount: Number(meta.response.headers.get('pagination-count')),
        };
      },
      providesTags: [{ type: 'Favorites', id: 'LiST' }],
    }),
    addFavorite: builder.mutation({
      query: (body) => ({
        url: `/favorites`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Favorites', id: 'LiST' }],
    }),
    removeFavorite: builder.mutation({
      query: (id) => ({
        url: `/favorites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Favorites', id: 'LiST' }],
    }),
  }),
});

export const {
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
} = favoritesApiSlice;
