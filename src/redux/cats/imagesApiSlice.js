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
      // providesTags: [{ type: 'Images', id: 'LiST' }],
      providesTags: result =>
        result?.response
          ? result?.response.map(item =>
              item?.favourite
                ? { type: 'Images', id: item.favourite.id }
                : { type: 'Images', id: item.id }
            )
          : ['Images'],
    }),
    getImageById: builder.query({
      query: id => `/images/${id}`,
      providesTags: (result, error, id) => [{ type: 'Images', id }],
      // providesTags: [{ type: 'Images', id: 'LiST' }],
      // providesTags: result =>
      //   result
      //     ? result.map(item =>
      //         item?.favourite
      //           ? { type: 'Images', id: item.favourite.id }
      //           : { type: 'Images', id: item.id }
      //       )
      //     : [],
    }),
  }),
});

export const { useGetAllImagesQuery } = imagesApiSlice;
