import { apiSlice } from '../apiSlice';

export const imagesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllImages: builder.query({
      query: ({ order, type, breedId, limit, page, userId }) =>
        `/images/search?sub_id=${userId}&order=${order}&limit=${limit}&page=${page}&mime_types=${type}&breed_ids=${breedId}`,
      transformResponse(response, meta) {
        return {
          response,
          totalCount: Number(meta.response.headers.get('pagination-count')),
        };
      },
      providesTags: ['Favorites'],
    }),
  }),
});

export const { useGetAllImagesQuery } = imagesApiSlice;
