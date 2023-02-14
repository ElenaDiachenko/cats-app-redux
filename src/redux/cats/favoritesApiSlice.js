import { apiSlice } from '../apiSlice';

export const favoritesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllFavorite: builder.query({
      query: ({ userId, limit, page }) =>
        `/favourites?sub_id=${userId}&limit=${limit}&page=${page}`,
      transformResponse(response, meta) {
        return {
          response,
          totalCount: Number(meta.response.headers.get('pagination-count')),
        };
      },
      // providesTags: result =>
      //   result
      //     ? [
      //         ...result.map(item => ({ type: 'Favorites', id: item.id })),
      //         { type: 'Favorites', id: 'LiST' },
      //       ]
      //     : [],
      providesTags: [{ type: 'Favorites', id: 'LiST' }],
    }),
    addFavorite: builder.mutation({
      query: body => ({
        url: `/favourites`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Images', id: 'LiST' },
        { type: 'Favorites', id: 'LiST' },
      ],
    }),
    removeFavorite: builder.mutation({
      query: id => ({
        url: `/favourites/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Favorites', id: 'LiST' },
        { type: 'Images', id: 'LiST' },
      ],
    }),
  }),
});

export const {
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
} = favoritesApiSlice;
