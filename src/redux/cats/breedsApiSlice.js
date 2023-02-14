import { apiSlice } from '../apiSlice';

export const breedsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBreedList: builder.query({
      query: () => `breeds`,
      // providesTags: result =>
      //   result ? result.map(({ id }) => ({ type: 'Breeds', id })) : [],
      providesTags: ['Breeds'],
    }),
    getBreedById: builder.query({
      query: id => `/images/search?limit=15&breed_ids=${id}`,
      providesTags: (result, error, id) => [{ type: 'Breeds', id }],
    }),
  }),
});

export const { useGetBreedListQuery, useGetBreedByIdQuery } = breedsApiSlice;
