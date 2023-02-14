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
      providesTags: result =>
        result?.response
          ? [
              ...result.response.map(({ id }) => ({ type: 'Favorites', id })),
              { type: 'Favorites', id: 'LiST' },
            ]
          : [{ type: 'Favorites', id: 'LiST' }],
    }),
    addFavorite: builder.mutation({
      query: body => ({
        url: `/favourites`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: 'Images', id: body.image_id },
        { type: 'Favorites', id: result.id },
      ],
    }),
    removeFavorite: builder.mutation({
      query: id => ({
        url: `/favourites/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, id) => [
        { type: 'Images', id },
        { type: 'Favorites', id },
      ],
    }),
  }),
});

export const {
  useGetAllFavoriteQuery,
  useRemoveFavoriteMutation,
  useAddFavoriteMutation,
} = favoritesApiSlice;
