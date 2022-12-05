import { apiSlice } from '../apiSlice';

export const breedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBreedList: builder.query({
      query: () => `breeds`,
      providesTags: [{ type: 'Breeds', id: 'LiST' }],
    }),
    getBreedById: builder.query({
      query: (id) => `/images/search?limit=15&breed_ids=${id}`,
      providesTags: [{ type: 'Breeds', id: 'LiST' }],
    }),
  }),
});

export const { useGetBreedListQuery, useGetBreedByIdQuery } = breedsApiSlice;
